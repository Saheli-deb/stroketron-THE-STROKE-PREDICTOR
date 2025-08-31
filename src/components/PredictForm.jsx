
import React, { useEffect, useState } from "react";
import { FaUser, FaVenusMars, FaHeartbeat, FaSmoking, FaWeight, FaBirthdayCake, FaFilePdf } from "react-icons/fa";

// point this to your FastAPI base
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export default function PredictForm({ language = "en" }) {
  // 1) username (either typed here or prefilled from localStorage)
  const [username, setUsername] = useState(localStorage.getItem("stroketron.username") || "");

  const [form, setForm] = useState({
    age: "",
    gender: "",
    hypertension: false,
    heart_disease: false,
    ever_married: "",          // "Yes" | "No"
    work_type: "",             // Govt_job | Private | Self-employed | children | Never_worked
    Residence_type: "",        // Urban | Rural
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",        // "never smoked" | "formerly smoked" | "smokes" | "Unknown"
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);  // { prediction, probability, message, pdf_url }
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("stroketron.lastResult");
    if (saved) { try { setResult(JSON.parse(saved)); } catch {} }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!username.trim()) {
      setError("Please enter username (used to generate & download your report).");
      return;
    }

    // persist username so history page can use it
    localStorage.setItem("stroketron.username", username.trim());

    setLoading(true);
    try {
      const payload = {
        username: username.trim(),
        gender: form.gender,
        age: Number(form.age),
        hypertension: form.hypertension ? 1 : 0,
        heart_disease: form.heart_disease ? 1 : 0,
        ever_married: form.ever_married,       // "Yes"/"No"
        work_type: form.work_type,             // must match backend map
        Residence_type: form.Residence_type,   // "Urban"/"Rural"
        avg_glucose_level: Number(form.avg_glucose_level),
        bmi: Number(form.bmi),
        smoking_status: form.smoking_status,   // exact string
      };

      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const pdf_url = `${API_BASE}/download-pdf/${encodeURIComponent(username.trim())}`;

      const uiResult = {
        prediction: data.prediction,
        probability: data.probability,
        message: data.message,
        pdf_url,
      };
      setResult(uiResult);
      localStorage.setItem("stroketron.lastResult", JSON.stringify(uiResult));
    } catch (err) {
      setError(err.message || "Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-lg mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2">
        <FaHeartbeat className="text-pink-400" /> Stroke Risk Prediction
      </h2>

      {/* USERNAME (needed by backend & for download link) */}
      <div className="mb-4">
        <label className="text-indigo-100 font-semibold flex items-center gap-2">
          <FaUser /> Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full"
          placeholder="Enter your username (same as /register)"
          required
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Age */}
        <div>
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaBirthdayCake /> Age
          </label>
          <input
            type="number" name="age" value={form.age} onChange={handleChange}
            required min="1" max="120"
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full"
            placeholder="Enter your age"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaVenusMars /> Gender
          </label>
          <select name="gender" value={form.gender} onChange={handleChange} required
                  className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full">
            <option value="">Select gender</option>
            <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
          </select>
        </div>

        {/* Hypertension + Heart disease */}
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex-1 text-indigo-100 font-semibold flex items-center gap-2">
            <FaHeartbeat /> Hypertension
            <input type="checkbox" name="hypertension" checked={form.hypertension} onChange={handleChange} className="ml-2" />
          </label>
          <label className="flex-1 text-indigo-100 font-semibold flex items-center gap-2">
            <FaHeartbeat /> Heart Disease
            <input type="checkbox" name="heart_disease" checked={form.heart_disease} onChange={handleChange} className="ml-2" />
          </label>
        </div>

        {/* Ever married */}
        <div>
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaUser /> Ever Married
          </label>
          <select name="ever_married" value={form.ever_married} onChange={handleChange} required
                  className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full">
            <option value="">Select</option>
            <option value="Yes">Yes</option><option value="No">No</option>
          </select>
        </div>

        {/* Work type */}
        <div>
          <label className="text-indigo-100 font-semibold">Work Type</label>
          <select name="work_type" value={form.work_type} onChange={handleChange} required
                  className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full">
            <option value="">Select work type</option>
            <option value="Govt_job">Govt_job</option>
            <option value="Private">Private</option>
            <option value="Self-employed">Self-employed</option>
            <option value="children">children</option>
            <option value="Never_worked">Never_worked</option>
          </select>
        </div>

        {/* Residence */}
        <div>
          <label className="text-indigo-100 font-semibold">Residence Type</label>
          <select name="Residence_type" value={form.Residence_type} onChange={handleChange} required
                  className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full">
            <option value="">Select residence</option>
            <option value="Urban">Urban</option><option value="Rural">Rural</option>
          </select>
        </div>

        {/* Avg glucose */}
        <div>
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaHeartbeat /> Avg Glucose Level
          </label>
          <input
            type="number" name="avg_glucose_level" value={form.avg_glucose_level} onChange={handleChange}
            required min="0" step="0.1"
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full"
            placeholder="e.g. 85.6"
          />
        </div>

        {/* BMI */}
        <div>
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaWeight /> BMI
          </label>
          <input
            type="number" name="bmi" value={form.bmi} onChange={handleChange}
            required min="10" max="60" step="0.1"
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full"
            placeholder="e.g. 22.5"
          />
        </div>

        {/* Smoking */}
        <div>
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaSmoking /> Smoking Status
          </label>
          <select name="smoking_status" value={form.smoking_status} onChange={handleChange} required
                  className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 w-full">
            <option value="">Select status</option>
            <option value="never smoked">never smoked</option>
            <option value="formerly smoked">formerly smoked</option>
            <option value="smokes">smokes</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {/* Result + Download button */}
        {result && (
          <div className={`mt-4 p-4 rounded-lg text-lg font-bold ${result.prediction === 1 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            <p className="mb-3">{result.message} (p={result.probability})</p>
            <a
              href={result.pdf_url}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold"
            >
              <FaFilePdf /> Download Report
            </a>
          </div>
        )}

        {error && <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">{error}</div>}
      </form>
    </section>
  );
}
