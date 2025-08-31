

# from fastapi import FastAPI, HTTPException, Query, Response
# from pydantic import BaseModel
# import joblib
# import pandas as pd
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse
# from datetime import datetime
# import os
# from fpdf import FPDF
# from gtts import gTTS
# from io import BytesIO

# # -----------------------------
# # App
# # -----------------------------
# app = FastAPI()
# # (Optional) keep default redirect_slashes=True; we’ll hide dupes explicitly.

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],        # tighten in prod
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -----------------------------
# # Model load
# # -----------------------------
# model = joblib.load("stroketron_model.pkl")

# # -----------------------------
# # Simple in-memory users
# # -----------------------------
# users: dict[str, str] = {}

# class RegisterInput(BaseModel):
#     username: str
#     password: str

# class StrokeInput(BaseModel):
#     username: str
#     gender: str
#     age: float
#     hypertension: int
#     heart_disease: int
#     ever_married: str
#     work_type: str
#     Residence_type: str
#     avg_glucose_level: float
#     bmi: float
#     smoking_status: str

# # -----------------------------
# # Helpers
# # -----------------------------
# def encode_input(data: dict) -> dict:
#     le_dict = {
#         'gender': {'Male': 1, 'Female': 0, 'Other': 2},
#         'ever_married': {'Yes': 1, 'No': 0},
#         'work_type': {'Private': 2, 'Self-employed': 3, 'Govt_job': 0, 'children': 1, 'Never_worked': 4},
#         'Residence_type': {'Urban': 1, 'Rural': 0},
#         'smoking_status': {'formerly smoked': 1, 'never smoked': 2, 'smokes': 3, 'Unknown': 0}
#     }
#     out = data.copy()
#     for col, mapping in le_dict.items():
#         if out[col] not in mapping:
#             raise HTTPException(status_code=400, detail=f"Invalid input: '{out[col]}' for {col}")
#         out[col] = mapping[out[col]]
#     return out

# def generate_pdf_report(user_input: dict, result: dict, filename: str):
#     os.makedirs(os.path.dirname(filename), exist_ok=True)
#     pdf = FPDF()
#     pdf.add_page()
#     pdf.set_font("Arial", size=12)
#     pdf.cell(200, 10, txt="Stroke Prediction Report", ln=True, align="C")
#     pdf.cell(200, 10, txt=f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True, align="C")
#     pdf.ln(10)
#     for key, val in user_input.items():
#         pdf.cell(200, 10, txt=f"{key.replace('_',' ').title()}: {val}", ln=True)
#     pdf.ln(10)
#     pdf.cell(200, 10, txt=result["message"], ln=True)
#     pdf.cell(200, 10, txt=f"Prediction: {'Stroke' if result['prediction'] == 1 else 'No Stroke'}", ln=True)
#     pdf.output(filename)

# def synthesize_gtts_mp3(text: str, lang: str = "en", tld: str = "co.in") -> bytes:
#     if not text or not text.strip():
#         raise HTTPException(status_code=400, detail="Missing or empty 'text'.")
#     buf = BytesIO()
#     try:
#         gTTS(text=text, lang=lang, tld=tld, slow=False).write_to_fp(buf)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"TTS error: {e}")
#     return buf.getvalue()

# # -----------------------------
# # Health
# # -----------------------------
# @app.get("/health")
# def health():
#     return {"status": "ok"}

# # -----------------------------
# # Register  (show only /register)
# # -----------------------------
# @app.post("/register", include_in_schema=True)
# @app.post("/register/", include_in_schema=False)   # hidden duplicate
# def register_user(user: RegisterInput):
#     if user.username in users:
#         raise HTTPException(status_code=400, detail="Username already exists.")
#     users[user.username] = user.password
#     return {"message": f"User {user.username} registered successfully."}

# # -----------------------------
# # Predict  (show only /predict)
# # -----------------------------
# @app.post("/predict", include_in_schema=True)
# @app.post("/predict/", include_in_schema=False)    # hidden duplicate
# def predict_stroke_risk(input_data: StrokeInput):
#     if input_data.username not in users:
#         raise HTTPException(status_code=401, detail="User not registered.")

#     raw_data = input_data.dict()
#     username = raw_data.pop('username')

#     encoded_data = encode_input(raw_data)
#     df = pd.DataFrame([encoded_data])

#     probability = float(model.predict_proba(df)[0][1])
#     prediction = int(probability > 0.5)

#     result = {
#         "prediction": prediction,
#         "probability": round(probability, 3),
#         "message": f"The probability of having a stroke is {round(probability * 100, 2)}%",
#         "username": username
#     }

#     pdf_path = f"reports/{username}_stroke_report.pdf"
#     generate_pdf_report(raw_data, result, pdf_path)
#     result["pdf_path"] = pdf_path
#     return result

# # -----------------------------
# # PDF download (single path)
# # -----------------------------
# @app.get("/download-pdf/{username}")
# def download_pdf(username: str):
#     pdf_path = f"reports/{username}_stroke_report.pdf"
#     if os.path.exists(pdf_path):
#         return FileResponse(path=pdf_path, filename=f"{username}_stroke_report.pdf", media_type='application/pdf')
#     raise HTTPException(status_code=404, detail="PDF not found.")

# # -----------------------------
# # TTS
# # -----------------------------
# @app.get("/tts")
# def tts(
#     text: str = Query(..., min_length=1),
#     lang: str = Query("en"),
#     tld: str = Query("co.in")
# ):
#     audio_bytes = synthesize_gtts_mp3(text=text, lang=lang, tld=tld)
#     return Response(content=audio_bytes, media_type="audio/mpeg", headers={"Cache-Control": "no-store"})

# # -----------------------------
# # Debug helper: list users
# # -----------------------------
# @app.get("/debug/users")
# def list_users():
#     return {"users": list(users.keys())}
from fastapi import FastAPI, HTTPException, Query, Response
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from datetime import datetime
import os
from fpdf import FPDF
from gtts import gTTS
from io import BytesIO
from typing import Optional, Dict

# -----------------------------
# App
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Model load
# -----------------------------
model = joblib.load("stroketron_model.pkl")

# -----------------------------
# In-memory users
# users[username] = {"password": "...", "email": "..."}
# -----------------------------
users: Dict[str, Dict[str, Optional[str]]] = {}

class RegisterInput(BaseModel):
    username: str
    password: str
    email: Optional[str] = None  # optional; kept for your UI

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

# -----------------------------
# Helpers
# -----------------------------
def encode_input(data: dict) -> dict:
    le_dict = {
        'gender': {'Male': 1, 'Female': 0, 'Other': 2},
        'ever_married': {'Yes': 1, 'No': 0},
        'work_type': {'Private': 2, 'Self-employed': 3, 'Govt_job': 0, 'children': 1, 'Never_worked': 4},
        'Residence_type': {'Urban': 1, 'Rural': 0},
        'smoking_status': {'formerly smoked': 1, 'never smoked': 2, 'smokes': 3, 'Unknown': 0}
    }
    out = data.copy()
    for col, mapping in le_dict.items():
        if out[col] not in mapping:
            raise HTTPException(status_code=400, detail=f"Invalid input: '{out[col]}' for {col}")
        out[col] = mapping[out[col]]
    return out

def generate_pdf_report(user_input: dict, result: dict, filename: str):
    os.makedirs(os.path.dirname(filename) or ".", exist_ok=True)
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

def synthesize_gtts_mp3(text: str, lang: str = "en", tld: str = "co.in") -> bytes:
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Missing or empty 'text'.")
    buf = BytesIO()
    try:
        gTTS(text=text, lang=lang, tld=tld, slow=False).write_to_fp(buf)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS error: {e}")
    return buf.getvalue()

# -----------------------------
# Health
# -----------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

# -----------------------------
# Register
# -----------------------------
@app.post("/register")
def register_user(user: RegisterInput):
    uname = user.username.strip()
    if not uname:
        raise HTTPException(status_code=400, detail="Username required.")
    if uname in users:
        raise HTTPException(status_code=400, detail="Username already exists.")
    users[uname] = {"password": user.password, "email": user.email}
    return {"message": f"User {uname} registered successfully."}

# -----------------------------
# Predict
# -----------------------------
@app.post("/predict")
def predict_stroke_risk(input_data: StrokeInput):
    if input_data.username not in users:
        # User not registered -> 401 (this is what you were seeing)
        raise HTTPException(status_code=401, detail="User not registered.")

    raw_data = input_data.dict()
    username = raw_data.pop('username')

    encoded_data = encode_input(raw_data)
    df = pd.DataFrame([encoded_data])

    probability = float(model.predict_proba(df)[0][1])
    prediction = int(probability > 0.5)

    result = {
        "prediction": prediction,
        "probability": round(probability, 3),
        "message": f"The probability of having a stroke is {round(probability * 100, 2)}%",
        "username": username
    }

    pdf_path = f"reports/{username}_stroke_report.pdf"
    generate_pdf_report(raw_data, result, pdf_path)
    result["pdf_path"] = pdf_path
    return result

# -----------------------------
# PDF download
# -----------------------------
@app.get("/download-pdf/{username}")
def download_pdf(username: str):
    pdf_path = f"reports/{username}_stroke_report.pdf"
    if os.path.exists(pdf_path):
        return FileResponse(path=pdf_path, filename=f"{username}_stroke_report.pdf", media_type='application/pdf')
    raise HTTPException(status_code=404, detail="PDF not found.")

# -----------------------------
# TTS
# -----------------------------
@app.get("/tts")
def tts(
    text: str = Query(..., min_length=1),
    lang: str = Query("en"),
    tld: str = Query("co.in")
):
    audio_bytes = synthesize_gtts_mp3(text=text, lang=lang, tld=tld)
    return Response(content=audio_bytes, media_type="audio/mpeg", headers={"Cache-Control": "no-store"})

# -----------------------------
# Debug helper: list users
# -----------------------------
@app.get("/debug/users")
def list_users():
    return {"users": list(users.keys())}
