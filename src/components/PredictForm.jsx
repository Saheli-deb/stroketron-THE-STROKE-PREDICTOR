import React, { useState } from "react";
// import any icons you want to use, e.g. from react-icons
import { FaUser, FaVenusMars, FaHeartbeat, FaSmoking, FaWeight, FaBirthdayCake } from "react-icons/fa";

const PredictForm = ({ username }) => {
  const [form, setForm] = useState({ age: "", gender: "", hypertension: false, heart_disease: false, ever_married: false, avg_glucose_level: "", bmi: "", smoking_status: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1500));
      // TODO: Replace with real API call
      setResult({ risk: Math.random() > 0.5 ? "High" : "Low" });
    } catch (err) {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-lg mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2"><FaHeartbeat className="text-pink-400" /> Stroke Risk Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaBirthdayCake /> Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} required min="1" max="120" className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Enter your age" />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaVenusMars /> Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaHeartbeat /> Hypertension</label>
            <input type="checkbox" name="hypertension" checked={form.hypertension} onChange={handleChange} className="ml-2" />
          </div>
          <div className="flex-1">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaHeartbeat /> Heart Disease</label>
            <input type="checkbox" name="heart_disease" checked={form.heart_disease} onChange={handleChange} className="ml-2" />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaUser /> Ever Married</label>
          <input type="checkbox" name="ever_married" checked={form.ever_married} onChange={handleChange} className="ml-2" />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaHeartbeat /> Avg Glucose Level</label>
          <input type="number" name="avg_glucose_level" value={form.avg_glucose_level} onChange={handleChange} required min="0" step="0.1" className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder="e.g. 85.6" />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaWeight /> BMI</label>
          <input type="number" name="bmi" value={form.bmi} onChange={handleChange} required min="10" max="60" step="0.1" className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder="e.g. 22.5" />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaSmoking /> Smoking Status</label>
          <select name="smoking_status" value={form.smoking_status} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900">
            <option value="">Select status</option>
            <option value="never smoked">Never smoked</option>
            <option value="formerly smoked">Formerly smoked</option>
            <option value="smokes">Smokes</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center" disabled={loading}>
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
          ) : "Predict"}
        </button>
        {result && (
          <div className={`mt-4 p-4 rounded-lg text-lg font-bold ${result.risk === "High" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            Stroke Risk: {result.risk}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">{error}</div>
        )}
      </form>
    </section>
  );
};

export default PredictForm; 