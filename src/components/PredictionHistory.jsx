import React from "react";
import { FaFilePdf, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";

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

const PredictionHistory = ({ username }) => {
  if (!username) {
    return (
      <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
        <h2 className="text-3xl font-bold text-indigo-200 mb-4 flex items-center gap-2"><FaHeartbeat className="text-pink-400" /> Prediction History</h2>
        <div className="bg-white/10 rounded-lg p-6 shadow-lg text-indigo-100 max-w-md">
          Please log in to view your prediction history.
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
      <h2 className="text-3xl font-bold text-indigo-200 mb-4 flex items-center gap-2"><FaHeartbeat className="text-pink-400" /> Prediction History</h2>
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
            {mockHistory.map((item, i) => (
              <tr key={i} className="border-t border-indigo-300/20">
                <td className="py-2 px-4">{item.date}</td>
                <td className={`py-2 px-4 font-bold ${item.risk === "High" ? "text-red-400" : "text-green-400"}`}>{item.risk}</td>
                <td className="py-2 px-4">
                  <a href={item.report} download className="flex items-center gap-1 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold shadow transition text-sm">
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
};

export default PredictionHistory; 