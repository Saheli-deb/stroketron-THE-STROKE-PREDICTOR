
import React, { useEffect, useState } from "react";
import { FaFilePdf, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export default function PredictionHistory() {
  const [username, setUsername] = useState(localStorage.getItem("stroketron.username") || "");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("stroketron.lastResult");
    if (saved && username) {
      try {
        const r = JSON.parse(saved);
        setRows([
          {
            date: new Date().toISOString().slice(0, 10),
            risk: r.prediction === 1 ? "High" : "Low",
            report: `${API_BASE}/download-pdf/${encodeURIComponent(username)}`,
          },
        ]);
      } catch {}
    }
  }, [username]);

  if (!username) {
    return (
      <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
        <h2 className="text-3xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
          <FaHeartbeat className="text-pink-400" /> Prediction History
        </h2>
        <div className="bg-white/10 rounded-lg p-6 shadow-lg text-indigo-100 max-w-md">
          Please log in or run a prediction first.
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
      <h2 className="text-3xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
        <FaHeartbeat className="text-pink-400" /> Prediction History
      </h2>
      <div className="w-full max-w-2xl bg-white/10 rounded-lg p-6 shadow-lg">
        <table className="w-full text-left text-indigo-100">
          <thead>
            <tr>
              <th className="py-2 px-4 font-semibold"><FaCalendarAlt className="inline mr-1" /> Date</th>
              <th className="py-2 px-4 font-semibold"><FaHeartbeat className="inline mr-1" /> Risk</th>
              <th className="py-2 px-4 font-semibold"><FaFilePdf className="inline mr-1" /> Report</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((it, i) => (
              <tr key={i} className="border-t border-indigo-300/20">
                <td className="py-2 px-4">{it.date}</td>
                <td className={`py-2 px-4 font-bold ${it.risk === "High" ? "text-red-400" : "text-green-400"}`}>{it.risk}</td>
                <td className="py-2 px-4">
                  <a href={it.report} download className="flex items-center gap-1 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold shadow transition text-sm">
                    <FaFilePdf /> Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
