export interface AssessmentPayload {
  age: number;
  sex: string;
  ethnicity: string;
  familyHistory: string;
  parentsRelated: string;
  fatigue: string;
  paleSkin: string;
  boneDeformities: string;
  slowGrowth: string;
  abdominalSwelling: string;
  breathlessness: string;
  anemiaHistory: string;
  frequentInfections: string;
  bloodTransfusions: string;
  ironIntake: string;
  chronicIllness: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function predictAssessment(payload: AssessmentPayload): Promise<string> {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Prediction API error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.prediction as string;
}

export interface NearbyClinic {
  place_id: string;
  name: string;
  vicinity?: string;
  rating?: number;
  user_ratings_total?: number;
  location?: { lat?: number; lng?: number };
  types?: string[];
}

export async function fetchNearbyClinics(lat: number, lng: number, radius = 5000): Promise<NearbyClinic[]> {
  const res = await fetch(`${API_BASE}/nearby_clinics?lat=${lat}&lng=${lng}&radius=${radius}`);
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return (data.results || []) as NearbyClinic[];
}


