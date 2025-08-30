import React from "react";

const TEXT = {
  en: {
    copyright: "All rights reserved.",
    about: "About",
    contact: "Contact",
  },
  hi: {
    copyright: "सभी अधिकार सुरक्षित।",
    about: "परिचय",
    contact: "संपर्क करें",
  },
  bn: {
    copyright: "সমস্ত অধিকার সংরক্ষিত।",
    about: "পরিচিতি",
    contact: "যোগাযোগ",
  },
};

const Footer = ({ language = "en" }) => (
  <footer className="bg-blue-900 text-white py-6 mt-12 shadow-inner">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-2 md:mb-0">
        &copy; {new Date().getFullYear()} Nexus. {TEXT[language].copyright}
      </div>
      <div className="space-x-6">
        <a href="#about" className="hover:text-yellow-300 transition">{TEXT[language].about}</a>
        <a href="#contact" className="hover:text-yellow-300 transition">{TEXT[language].contact}</a>
      </div>
    </div>
  </footer>
);

export default Footer;