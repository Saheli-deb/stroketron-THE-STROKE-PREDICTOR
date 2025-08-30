from fastapi import FastAPI, HTTPException, Query, Response
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from datetime import datetime
import os
from fpdf import FPDF
from gtts import gTTS
from io import BytesIO

# --- Model load (kept as-is) ---
model = joblib.load("stroketron_model.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Simple in-memory users (kept as-is) ---
users = {}

class RegisterInput(BaseModel):
    username: str
    password: str

class StrokeInput(BaseModel):
    username: str
    gender: str
    age: float
    hypertension: int
    heart_disease: int
    ever_married: str
    work_type: str
    Residence_type: str
    avg_glucose_level: float
    bmi: float
    smoking_status: str

# --- Label encoding (kept as-is) ---
def encode_input(data):
    le_dict = {
        'gender': {'Male': 1, 'Female': 0, 'Other': 2},
        'ever_married': {'Yes': 1, 'No': 0},
        'work_type': {'Private': 2, 'Self-employed': 3, 'Govt_job': 0, 'children': 1, 'Never_worked': 4},
        'Residence_type': {'Urban': 1, 'Rural': 0},
        'smoking_status': {'formerly smoked': 1, 'never smoked': 2, 'smokes': 3, 'Unknown': 0}
    }

    for col, mapping in le_dict.items():
        if data[col] not in mapping:
            raise HTTPException(status_code=400, detail=f"Invalid input: '{data[col]}' for {col}")
        data[col] = mapping[data[col]]

    return data

# --- Registration (kept as-is) ---
@app.post("/register/")
def register_user(user: RegisterInput):
    if user.username in users:
        raise HTTPException(status_code=400, detail="Username already exists.")
    users[user.username] = user.password
    return {"message": f"User {user.username} registered successfully."}

# --- Prediction (kept as-is) ---
@app.post("/predict/")
def predict_stroke_risk(input_data: StrokeInput):
    try:
        if input_data.username not in users:
            raise HTTPException(status_code=401, detail="User not registered.")

        raw_data = input_data.dict()
        username = raw_data.pop('username')
        encoded_data = encode_input(raw_data)
        df = pd.DataFrame([encoded_data])

        probability = model.predict_proba(df)[0][1]
        prediction = int(probability > 0.5)

        result = {
            "prediction": prediction,
            "probability": round(probability, 3),
            "message": f"The probability of having a stroke is {round(probability * 100, 2)}%",
            "username": username
        }

        os.makedirs("reports", exist_ok=True)
        pdf_path = f"reports/{username}_stroke_report.pdf"
        generate_pdf_report(raw_data, result, pdf_path)

        result["pdf_path"] = pdf_path
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- PDF generation (kept as-is) ---
def generate_pdf_report(user_input, result, filename):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="Stroke Prediction Report", ln=True, align="C")
    pdf.cell(200, 10, txt=f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True, align="C")
    pdf.ln(10)

    for key, val in user_input.items():
        pdf.cell(200, 10, txt=f"{key.replace('_',' ').title()}: {val}", ln=True)

    pdf.ln(10)
    pdf.cell(200, 10, txt=result["message"], ln=True)
    pdf.cell(200, 10, txt=f"Prediction: {'Stroke' if result['prediction'] == 1 else 'No Stroke'}", ln=True)

    pdf.output(filename)

# --- PDF download (kept as-is) ---
@app.get("/download-pdf/{username}")
def download_pdf(username: str):
    pdf_path = f"reports/{username}_stroke_report.pdf"
    if os.path.exists(pdf_path):
        return FileResponse(path=pdf_path, filename=f"{username}_stroke_report.pdf", media_type='application/pdf')
    else:
        raise HTTPException(status_code=404, detail="PDF not found.")

# =========================
# NEW: gTTS voice endpoint
# =========================
def synthesize_gtts_mp3(text: str, lang: str = "en", tld: str = "co.in") -> bytes:
    """
    Convert text to MP3 bytes using Google Text-to-Speech.
    lang options include: 'en', 'bn', 'hi', etc.
    tld controls accent region for English (e.g., 'co.in', 'com.au', 'co.uk').
    """
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Missing or empty 'text'.")
    try:
        buf = BytesIO()
        gTTS(text=text, lang=lang, tld=tld, slow=False).write_to_fp(buf)
        return buf.getvalue()
    except Exception as e:
        # gTTS reaches out to Google; ensure server has internet
        raise HTTPException(status_code=500, detail=f"TTS error: {e}")

@app.get("/tts")
def tts(
    text: str = Query(..., min_length=1),
    lang: str = Query("en"),   # 'bn' for Bengali, 'hi' for Hindi
    tld: str = Query("co.in")  # Indian English accent when lang='en'
):
    audio_bytes = synthesize_gtts_mp3(text=text, lang=lang, tld=tld)
    # Return raw MP3 for the browser to play
    return Response(content=audio_bytes, media_type="audio/mpeg", headers={"Cache-Control": "no-store"})

