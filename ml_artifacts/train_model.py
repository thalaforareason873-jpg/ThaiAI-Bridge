from pathlib import Path

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (classification_report, confusion_matrix,
                             roc_auc_score, roc_curve)
from sklearn.model_selection import (StratifiedKFold, cross_val_score,
                                     train_test_split)
from sklearn.preprocessing import label_binarize

# =====================================
# CATEGORY ENCODING (Frontend aligned)
# =====================================

CATEGORY_MAPS = {
    "sex": {"female": 0, "male": 1, "other": 2},
    "ethnicity": {
        "south-asian": 0,
        "mediterranean": 1,
        "middle-eastern": 2,
        "african": 3,
        "other-ethnicity": 4,
    },
    "familyHistory": {"no": 0, "yes": 1, "dont-know": 2},
    "parentsRelated": {"no": 0, "yes": 1, "dont-know": 2},
    "fatigue": {"none": 0, "mild": 1, "moderate": 2, "severe": 3},
    "paleSkin": {"none": 0, "mild": 1, "moderate": 2, "severe": 3},
    "boneDeformities": {"no": 0, "yes": 1},
    "slowGrowth": {"no": 0, "yes": 1, "dont-know": 2},
    "abdominalSwelling": {"no": 0, "yes": 1},
    "breathlessness": {"no": 0, "yes": 1},
    "anemiaHistory": {"no": 0, "yes": 1, "dont-know": 2},
    "frequentInfections": {"no": 0, "yes": 1, "sometimes": 2},
    "bloodTransfusions": {"no": 0, "yes": 1, "dont-know": 2},
    "ironIntake": {"low": 0, "normal": 1, "high": 2},
    "chronicIllness": {"no": 0, "yes": 1},
}

STATUS_MAP = {"Normal": 0, "Carrier": 1, "Patient": 2}
STATUS_INV_MAP = {v: k for k, v in STATUS_MAP.items()}


# =====================================
# DATA PREPROCESSING
# =====================================

def load_and_preprocess(csv_path: str):
    df = pd.read_csv(csv_path)

    print("\nDataset Shape:", df.shape)
    print("\nDataset Description:\n", df.describe())

    df["age"] = pd.to_numeric(df["age"], errors="coerce").fillna(0)

    for col, mapping in CATEGORY_MAPS.items():
        df[col] = df[col].astype(str).str.strip().str.lower()
        df[col] = df[col].map(mapping)

    y = df["status"].map(STATUS_MAP)
    X = df.drop(columns=["status"])

    return X, y


# =====================================
# MODEL TRAINING
# =====================================

def train(csv_path: str, out_dir: str = "ml_artifacts"):

    X, y = load_and_preprocess(csv_path)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    model = LogisticRegression(
        max_iter=1000,
        multi_class="multinomial",
        solver="lbfgs"
    )

    model.fit(X_train, y_train)

    # ==========================
    # Cross Validation
    # ==========================

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    scores = cross_val_score(model, X, y, cv=cv)

    print(f"\nCross Validation Accuracy: {scores.mean():.4f} ± {scores.std():.4f}")

    # ==========================
    # Test Evaluation
    # ==========================

    y_pred = model.predict(X_test)

    print("\nClassification Report:\n")
    print(classification_report(
        y_test,
        y_pred,
        target_names=[STATUS_INV_MAP[i] for i in sorted(STATUS_INV_MAP)]
    ))

    # ==========================
    # Confusion Matrix
    # ==========================

    cm = confusion_matrix(y_test, y_pred)

    plt.figure(figsize=(6, 5))
    sns.heatmap(
        cm,
        annot=True,
        fmt="d",
        xticklabels=[STATUS_INV_MAP[i] for i in sorted(STATUS_INV_MAP)],
        yticklabels=[STATUS_INV_MAP[i] for i in sorted(STATUS_INV_MAP)]
    )
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.title("Confusion Matrix")
    plt.show()

    # ==========================
    # ROC-AUC (Multi-class)
    # ==========================

    y_test_bin = label_binarize(y_test, classes=[0,1,2])
    y_score = model.predict_proba(X_test)

    roc_auc = roc_auc_score(y_test_bin, y_score, average="macro")
    print(f"\nMulti-class ROC-AUC Score: {roc_auc:.4f}")

    # ==========================
    # Save Model
    # ==========================

    out = Path(out_dir)
    out.mkdir(exist_ok=True)

    joblib.dump(model, out / "thalassemia_model.pkl")
    joblib.dump(
        {"CATEGORY_MAPS": CATEGORY_MAPS, "STATUS_MAP": STATUS_MAP},
        out / "metadata.pkl"
    )

    print("\nModel Saved Successfully!")


if __name__ == "__main__":
    train("thalassemia_synthetic_dataset.csv")
