// import React, { useState } from "react";
// import { FaUser, FaVenusMars, FaHeartbeat, FaSmoking, FaWeight, FaBirthdayCake } from "react-icons/fa";

// const TEXT = {
//   en: {
//     title: "Stroke Risk Prediction",
//     age: "Age",
//     agePlaceholder: "Enter your age",
//     gender: "Gender",
//     genderSelect: "Select gender",
//     male: "Male",
//     female: "Female",
//     other: "Other",
//     hypertension: "Hypertension",
//     heartDisease: "Heart Disease",
//     everMarried: "Ever Married",
//     avgGlucose: "Avg Glucose Level",
//     avgGlucosePlaceholder: "e.g. 85.6",
//     bmi: "BMI",
//     bmiPlaceholder: "e.g. 22.5",
//     smokingStatus: "Smoking Status",
//     smokingSelect: "Select status",
//     neverSmoked: "Never smoked",
//     formerlySmoked: "Formerly smoked",
//     smokes: "Smokes",
//     unknown: "Unknown",
//     predict: "Predict",
//     highRisk: "Stroke Risk: High",
//     lowRisk: "Stroke Risk: Low",
//     error: "Prediction failed. Please try again.",
//   },
//   hi: {
//     title: "स्ट्रोक जोखिम पूर्वानुमान",
//     age: "आयु",
//     agePlaceholder: "अपनी आयु दर्ज करें",
//     gender: "लिंग",
//     genderSelect: "लिंग चुनें",
//     male: "पुरुष",
//     female: "महिला",
//     other: "अन्य",
//     hypertension: "हाइपरटेंशन",
//     heartDisease: "हृदय रोग",
//     everMarried: "क्या शादी हुई",
//     avgGlucose: "औसत ग्लूकोज स्तर",
//     avgGlucosePlaceholder: "जैसे 85.6",
//     bmi: "बीएमआई",
//     bmiPlaceholder: "जैसे 22.5",
//     smokingStatus: "धूम्रपान स्थिति",
//     smokingSelect: "स्थिति चुनें",
//     neverSmoked: "कभी नहीं किया",
//     formerlySmoked: "पहले किया",
//     smokes: "करते हैं",
//     unknown: "अज्ञात",
//     predict: "पूर्वानुमान करें",
//     highRisk: "स्ट्रोक जोखिम: उच्च",
//     lowRisk: "स्ट्रोक जोखिम: निम्न",
//     error: "पूर्वानुमान विफल रहा। कृपया पुनः प्रयास करें।",
//   },
//   bn: {
//     title: "স্ট্রোক ঝুঁকি পূর্বাভাস",
//     age: "বয়স",
//     agePlaceholder: "আপনার বয়স লিখুন",
//     gender: "লিঙ্গ",
//     genderSelect: "লিঙ্গ নির্বাচন করুন",
//     male: "পুরুষ",
//     female: "মহিলা",
//     other: "অন্যান্য",
//     hypertension: "হাইপারটেনশন",
//     heartDisease: "হৃদরোগ",
//     everMarried: "বিবাহিত কিনা",
//     avgGlucose: "গ্লুকোজের গড় স্তর",
//     avgGlucosePlaceholder: "যেমন 85.6",
//     bmi: "বিএমআই",
//     bmiPlaceholder: "যেমন 22.5",
//     smokingStatus: "ধূমপানের অবস্থা",
//     smokingSelect: "অবস্থা নির্বাচন করুন",
//     neverSmoked: "কখনও করেননি",
//     formerlySmoked: "আগে করতেন",
//     smokes: "করেন",
//     unknown: "অজানা",
//     predict: "পূর্বাভাস করুন",
//     highRisk: "স্ট্রোক ঝুঁকি: উচ্চ",
//     lowRisk: "স্ট্রোক ঝুঁকি: নিম্ন",
//     error: "পূর্বাভাস ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
//   }
// };

// const PredictForm = ({ username, language = "en" }) => {
//   const [form, setForm] = useState({
//     age: "",
//     gender: "",
//     hypertension: false,
//     heart_disease: false,
//     ever_married: false,
//     avg_glucose_level: "",
//     bmi: "",
//     smoking_status: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResult(null);
//     try {
//       // Simulate API call
//       await new Promise((res) => setTimeout(res, 1500));
//       // TODO: Replace with real API call
//       setResult({ risk: Math.random() > 0.5 ? "High" : "Low" });
//     } catch (err) {
//       setError(TEXT[language].error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full max-w-lg mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
//       <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2">
//         <FaHeartbeat className="text-pink-400" /> {TEXT[language].title}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4 text-left">
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaBirthdayCake /> {TEXT[language].age}
//           </label>
//           <input
//             type="number"
//             name="age"
//             value={form.age}
//             onChange={handleChange}
//             required
//             min="1"
//             max="120"
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             placeholder={TEXT[language].agePlaceholder}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaVenusMars /> {TEXT[language].gender}
//           </label>
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             required
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
//           >
//             <option value="">{TEXT[language].genderSelect}</option>
//             <option value="Male">{TEXT[language].male}</option>
//             <option value="Female">{TEXT[language].female}</option>
//             <option value="Other">{TEXT[language].other}</option>
//           </select>
//         </div>
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <label className="text-indigo-100 font-semibold flex items-center gap-2">
//               <FaHeartbeat /> {TEXT[language].hypertension}
//             </label>
//             <input
//               type="checkbox"
//               name="hypertension"
//               checked={form.hypertension}
//               onChange={handleChange}
//               className="ml-2"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="text-indigo-100 font-semibold flex items-center gap-2">
//               <FaHeartbeat /> {TEXT[language].heartDisease}
//             </label>
//             <input
//               type="checkbox"
//               name="heart_disease"
//               checked={form.heart_disease}
//               onChange={handleChange}
//               className="ml-2"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaUser /> {TEXT[language].everMarried}
//           </label>
//           <input
//             type="checkbox"
//             name="ever_married"
//             checked={form.ever_married}
//             onChange={handleChange}
//             className="ml-2"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaHeartbeat /> {TEXT[language].avgGlucose}
//           </label>
//           <input
//             type="number"
//             name="avg_glucose_level"
//             value={form.avg_glucose_level}
//             onChange={handleChange}
//             required
//             min="0"
//             step="0.1"
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
//             placeholder={TEXT[language].avgGlucosePlaceholder}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaWeight /> {TEXT[language].bmi}
//           </label>
//           <input
//             type="number"
//             name="bmi"
//             value={form.bmi}
//             onChange={handleChange}
//             required
//             min="10"
//             max="60"
//             step="0.1"
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
//             placeholder={TEXT[language].bmiPlaceholder}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaSmoking /> {TEXT[language].smokingStatus}
//           </label>
//           <select
//             name="smoking_status"
//             value={form.smoking_status}
//             onChange={handleChange}
//             required
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
//           >
//             <option value="">{TEXT[language].smokingSelect}</option>
//             <option value="never smoked">{TEXT[language].neverSmoked}</option>
//             <option value="formerly smoked">{TEXT[language].formerlySmoked}</option>
//             <option value="smokes">{TEXT[language].smokes}</option>
//             <option value="Unknown">{TEXT[language].unknown}</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center"
//           disabled={loading}
//         >
//           {loading ? (
//             <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//             </svg>
//           ) : TEXT[language].predict}
//         </button>
//         {result && (
//           <div className={`mt-4 p-4 rounded-lg text-lg font-bold ${result.risk === "High" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
//             {result.risk === "High" ? TEXT[language].highRisk : TEXT[language].lowRisk}
//           </div>
//         )}
//         {error && (
//           <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">{error}</div>
//         )}
//       </form>
//     </section>
//   );
// };

// export default PredictForm;
import React, { useState } from "react";
import { FaUser, FaVenusMars, FaHeartbeat, FaSmoking, FaWeight, FaBirthdayCake, FaDownload } from "react-icons/fa";

const TEXT = {
  en: {
    title: "Stroke Risk Prediction",
    username: "Username",
    usernamePlaceholder: "Enter username used at register",
    age: "Age",
    agePlaceholder: "Enter your age",
    gender: "Gender",
    genderSelect: "Select gender",
    male: "Male",
    female: "Female",
    other: "Other",
    hypertension: "Hypertension",
    heartDisease: "Heart Disease",
    everMarried: "Ever Married",
    avgGlucose: "Avg Glucose Level",
    avgGlucosePlaceholder: "e.g. 85.6",
    bmi: "BMI",
    bmiPlaceholder: "e.g. 22.5",
    smokingStatus: "Smoking Status",
    smokingSelect: "Select status",
    neverSmoked: "Never smoked",
    formerlySmoked: "Formerly smoked",
    smokes: "Smokes",
    unknown: "Unknown",
    predict: "Predict",
    highRisk: "Stroke Risk: High",
    lowRisk: "Stroke Risk: Low",
    error: "Prediction failed. Please try again.",
    download: "Download Report",
  },
};

export default function PredictForm({ username = "", language = "en" }) {
  const t = TEXT[language] || TEXT.en;

  const [uname, setUname] = useState(
    (username ||
      (typeof window !== "undefined" && localStorage.getItem("stroketron.username")) ||
      "").trim()
  );

  const [form, setForm] = useState({
    age: "",
    gender: "",
    hypertension: false,
    heart_disease: false,
    ever_married: false,
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(""); // <-- use /download-pdf/{username}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setDownloadUrl("");

    const body = {
      username: (uname || "").trim(),
      gender: form.gender,
      age: Number(form.age),
      hypertension: form.hypertension ? 1 : 0,
      heart_disease: form.heart_disease ? 1 : 0,
      ever_married: form.ever_married ? "Yes" : "No",
      work_type: "Private",
      Residence_type: "Urban",
      avg_glucose_level: Number(form.avg_glucose_level),
      bmi: Number(form.bmi),
      smoking_status: form.smoking_status || "Unknown", // 'formerly smoked' | 'never smoked' | 'smokes' | 'Unknown'
    };

    // basic guards
    for (const k of ["age", "avg_glucose_level", "bmi"]) {
      if (Number.isNaN(body[k])) {
        setLoading(false);
        setError(t.error);
        return;
      }
    }
    if (!body.username) {
      setLoading(false);
      setError("Username required.");
      return;
    }

    try {
      const res = await fetch("/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || t.error);
      }

      const data = await res.json();
      setResult(data);

      // <-- use the existing download endpoint (works with your current main.py)
      setDownloadUrl(`/download-pdf/${encodeURIComponent(body.username)}`);

      if (body.username && typeof window !== "undefined") {
        localStorage.setItem("stroketron.username", body.username);
      }
    } catch (err) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-lg mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2">
        <FaHeartbeat className="text-pink-400" /> {t.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Username (always visible) */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaUser /> {t.username}
          </label>
          <input
            type="text"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            onBlur={(e) => setUname(e.target.value.trim())}
            required
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
            placeholder={t.usernamePlaceholder}
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaBirthdayCake /> {t.age}
          </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder={t.agePlaceholder}
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaVenusMars /> {t.gender}
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
          >
            <option value="">{t.genderSelect}</option>
            <option value="Male">{t.male}</option>
            <option value="Female">{t.female}</option>
            <option value="Other">{t.other}</option>
          </select>
        </div>

        {/* Hypertension / Heart disease */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-indigo-100 font-semibold flex items-center gap-2">
              <FaHeartbeat /> {t.hypertension}
            </label>
            <input type="checkbox" name="hypertension" checked={form.hypertension} onChange={handleChange} className="ml-2" />
          </div>
          <div className="flex-1">
            <label className="text-indigo-100 font-semibold flex items-center gap-2">
              <FaHeartbeat /> {t.heartDisease}
            </label>
            <input type="checkbox" name="heart_disease" checked={form.heart_disease} onChange={handleChange} className="ml-2" />
          </div>
        </div>

        {/* Ever married */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaUser /> {t.everMarried}
          </label>
          <input type="checkbox" name="ever_married" checked={form.ever_married} onChange={handleChange} className="ml-2" />
        </div>

        {/* Glucose */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaHeartbeat /> {t.avgGlucose}
          </label>
          <input
            type="number"
            name="avg_glucose_level"
            value={form.avg_glucose_level}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
            placeholder={t.avgGlucosePlaceholder}
          />
        </div>

        {/* BMI */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaWeight /> {t.bmi}
          </label>
          <input
            type="number"
            name="bmi"
            value={form.bmi}
            onChange={handleChange}
            required
            min="10"
            max="60"
            step="0.1"
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
            placeholder={t.bmiPlaceholder}
          />
        </div>

        {/* Smoking */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaSmoking /> {t.smokingStatus}
          </label>
          <select
            name="smoking_status"
            value={form.smoking_status}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
          >
            <option value="">{t.smokingSelect}</option>
            <option value="never smoked">{t.neverSmoked}</option>
            <option value="formerly smoked">{t.formerlySmoked}</option>
            <option value="smokes">{t.smokes}</option>
            <option value="Unknown">{t.unknown}</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Predicting..." : t.predict}
        </button>

        {/* Result */}
        {result && (
          <div className={`mt-4 p-4 rounded-lg text-lg font-bold ${result.prediction === 1 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {result.prediction === 1 ? t.highRisk : t.lowRisk}
            <div className="text-sm mt-2">{result.message}</div>
          </div>
        )}

        {/* Download via /download-pdf/{username} */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            download
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow"
          >
            <FaDownload /> {t.download}
          </a>
        )}

        {error && <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">{error}</div>}
      </form>
    </section>
  );
}
