import React from "react";
import { FaFilePdf, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";

// Multilingual text
const TEXT = {
  en: {
    title: "Prediction History",
    loginMsg: "Please log in to view your prediction history.",
    date: "Date",
    risk: "Risk",
    report: "Report",
    download: "Download",
    high: "High",
    low: "Low",
  },
  hi: {
    title: "पूर्वानुमान इतिहास",
    loginMsg: "अपना पूर्वानुमान इतिहास देखने के लिए कृपया लॉगिन करें।",
    date: "तारीख",
    risk: "जोखिम",
    report: "रिपोर्ट",
    download: "डाउनलोड करें",
    high: "उच्च",
    low: "निम्न",
  },
  bn: {
    title: "পূর্বাভাস ইতিহাস",
    loginMsg: "আপনার পূর্বাভাস ইতিহাস দেখতে লগইন করুন।",
    date: "তারিখ",
    risk: "ঝুঁকি",
    report: "রিপোর্ট",
    download: "ডাউনলোড করুন",
    high: "উচ্চ",
    low: "নিম্ন",
  },
};

// Mock data for demonstration
const mockHistory = [
  {
    date: "2024-06-01",
    risk: "High",
    report: "/reports/John Smith_stroke_report.pdf",
  },
  {
    date: "2024-05-15",
    risk: "Low",
    report: "/reports/Sam_stroke_report.pdf",
  },
];

const PredictionHistory = ({ username, language = "en" }) => {
  if (!username) {
    return (
      <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
        <h2 className="text-3xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
          <FaHeartbeat className="text-pink-400" /> {TEXT[language].title}
        </h2>
        <div className="bg-white/10 rounded-lg p-6 shadow-lg text-indigo-100 max-w-md">
          {TEXT[language].loginMsg}
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
      <h2 className="text-3xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
        <FaHeartbeat className="text-pink-400" /> {TEXT[language].title}
      </h2>
      <div className="w-full max-w-2xl bg-white/10 rounded-lg p-6 shadow-lg">
        <table className="w-full text-left text-indigo-100">
          <thead>
            <tr>
              <th className="py-2 px-4 font-semibold">
                <FaCalendarAlt className="inline mr-1" /> {TEXT[language].date}
              </th>
              <th className="py-2 px-4 font-semibold">
                <FaHeartbeat className="inline mr-1" /> {TEXT[language].risk}
              </th>
              <th className="py-2 px-4 font-semibold">
                <FaFilePdf className="inline mr-1" /> {TEXT[language].report}
              </th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((item, i) => (
              <tr key={i} className="border-t border-indigo-300/20">
                <td className="py-2 px-4">{item.date}</td>
                <td className={`py-2 px-4 font-bold ${item.risk === "High" ? "text-red-400" : "text-green-400"}`}>
                  {item.risk === "High" ? TEXT[language].high : TEXT[language].low}
                </td>
                <td className="py-2 px-4">
                  <a
                    href={item.report}
                    download
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold shadow transition text-sm"
                  >
                    <FaFilePdf /> {TEXT[language].download}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PredictionHistory;