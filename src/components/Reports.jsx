import React from "react";
import { FaFilePdf, FaDownload } from "react-icons/fa";

// List of reports (in a real app, fetch from backend or file system)
const reports = [
  { name: "John Smith_stroke_report.pdf", path: "/reports/John Smith_stroke_report.pdf" },
  { name: "Sam_stroke_report.pdf", path: "/reports/Sam_stroke_report.pdf" },
];

const Reports = () => (
  <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
    <h2 className="text-4xl font-bold text-indigo-200 mb-4 flex items-center gap-2"><FaFilePdf className="text-red-400" /> Your Stroketron Reports</h2>
    <p className="text-indigo-100 mb-6">Download your Stroketron stroke prediction reports below.</p>
    <div className="w-full max-w-xl bg-white/10 rounded-lg p-6 shadow-lg">
      {reports.length === 0 ? (
        <div className="text-indigo-100">No reports available.</div>
      ) : (
        <ul className="divide-y divide-indigo-300/20">
          {reports.map((report) => (
            <li key={report.name} className="flex items-center justify-between py-4">
              <span className="flex items-center gap-2 text-indigo-100 font-medium">
                <FaFilePdf className="text-red-400" /> {report.name}
              </span>
              <a href={report.path} download className="flex items-center gap-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold shadow transition">
                <FaDownload /> Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default Reports; 