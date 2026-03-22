from pathlib import Path
from typing import Dict

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ==============================
# LOAD MODEL
# ==============================

ARTIFACT_DIR = Path(__file__).parent / "ml_artifacts"
MODEL_PATH = ARTIFACT_DIR / "thalassemia_model.pkl"
METADATA_PATH = ARTIFACT_DIR / "metadata.pkl"

if not MODEL_PATH.exists():
    raise FileNotFoundError("Model not found. Run train_model.py first.")

model = joblib.load(MODEL_PATH)
metadata: Dict = joblib.load(METADATA_PATH)

CATEGORY_MAPS = metadata["CATEGORY_MAPS"]
STATUS_MAP = metadata["STATUS_MAP"]
INV_STATUS_MAP = {v: k for k, v in STATUS_MAP.items()}

FEATURE_ORDER = ["age", *CATEGORY_MAPS.keys()]

# ==============================
# FASTAPI SETUP
# ==============================

app = FastAPI(title="Thalassemia Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# REQUEST MODEL
# ==============================

class AssessmentData(BaseModel):
    age: int
    sex: str
    ethnicity: str
    familyHistory: str
    parentsRelated: str
    fatigue: str
    paleSkin: str
    boneDeformities: str
    slowGrowth: str
    abdominalSwelling: str
    breathlessness: str
    anemiaHistory: str
    frequentInfections: str
    bloodTransfusions: str
    ironIntake: str
    chronicIllness: str


# ==============================
# PREDICTION
# ==============================

@app.post("/predict")
def predict(data: AssessmentData):
    input_dict = data.dict()

    encoded = []
    for col in FEATURE_ORDER:
        if col == "age":
            encoded.append(int(input_dict[col]))
        else:
            raw = input_dict[col].strip().lower()
            mapping = CATEGORY_MAPS[col]

            if raw not in mapping:
                raise ValueError(f"Invalid value '{raw}' for column '{col}'")

            encoded.append(mapping[raw])

    X = [encoded]

    prediction = int(model.predict(X)[0])
    label = INV_STATUS_MAP[prediction]

    probs = model.predict_proba(X)[0]
    probabilities = {
        INV_STATUS_MAP[i]: float(probs[i])
        for i in range(len(probs))
    }

    return {
        "prediction": label,
        "probabilities": probabilities
    }


@app.get("/health")
def health():
    return {"status": "ok"}
@app.get("/")
def root():
    return {"message": "Thalassemia API is running"}
