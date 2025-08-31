# Dockerfile
FROM python:3.11-slim

# System prep (slim image is fine for numpy/pandas/scikit-learn wheels)
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=8000

WORKDIR /app

# Install Python deps first (better layer caching)
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy your app code and model
# (Ensure stroketron_model.pkl is in the repo; adjust path if needed.)
COPY main.py .
COPY stroketron_model.pkl ./stroketron_model.pkl

# Create a persistent dir for PDF reports
RUN mkdir -p /app/reports
VOLUME ["/app/reports"]

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
