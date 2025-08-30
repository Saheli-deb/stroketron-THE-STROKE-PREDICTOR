import React, { useEffect, useState } from "react";
import nexusLogo from "../assets/nexus-logo.png";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const TEXT = {
  en: {
    home: "Home",
    predict: "Predict",
    reports: "Reports",
    history: "History",
    articles: "Articles",
    about: "About",
    faq: "FAQ",
    login: "Login",
    register: "Register",
    contact: "Contact",
    langEnglish: "English",
    langHindi: "हिन्दी",
    langBengali: "বাংলা"
  },
  hi: {
    home: "होम",
    predict: "पूर्वानुमान",
    reports: "रिपोर्ट्स",
    history: "इतिहास",
    articles: "लेख",
    about: "परिचय",
    faq: "सामान्य प्रश्न",
    login: "लॉगिन",
    register: "रजिस्टर करें",
    contact: "संपर्क करें",
    langEnglish: "English",
    langHindi: "हिन्दी",
    langBengali: "বাংলা"
  },
  bn: {
    home: "হোম",
    predict: "পূর্বাভাস",
    reports: "রিপোর্ট",
    history: "ইতিহাস",
    articles: "প্রবন্ধ",
    about: "পরিচিতি",
    faq: "প্রশ্ন",
    login: "লগইন",
    register: "রেজিস্টার করুন",
    contact: "যোগাযোগ",
    langEnglish: "English",
    langHindi: "হিন্দি",
    langBengali: "বাংলা"
  }
};

const NavBar = ({ language = "en", setLanguage }) => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-500 dark:from-gray-900 dark:to-gray-800 shadow-lg sticky top-0 z-50" role="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" tabIndex={0} className="focus:outline-none focus:ring-2 focus:ring-yellow-300">
            <img src={nexusLogo} alt="Stroketron Logo" className="h-10 w-10 mr-3 rounded-full shadow-md" />
          </Link>
          <span className="text-white font-bold text-xl tracking-wide">Stroketron</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-8">
            <Link to="/" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].home}</Link>
            <Link to="/predict" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].predict}</Link>
            <Link to="/reports" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].reports}</Link>
            <Link to="/history" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].history}</Link>
            <Link to="/articles" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].articles}</Link>
            <Link to="/about" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].about}</Link>
            <Link to="/faq" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].faq}</Link>
            <Link to="/login" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].login}</Link>
            <Link to="/register" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].register}</Link>
            <Link to="/contact" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">{TEXT[language].contact}</Link>
          </div>
          {/* Language Switcher */}
          {setLanguage && (
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="ml-4 p-2 rounded bg-white/20 text-white dark:text-yellow-300"
            >
              <option value="en">{TEXT.en.langEnglish}</option>
              <option value="hi">{TEXT.en.langHindi}</option>
              <option value="bn">{TEXT.en.langBengali}</option>
            </select>
          )}
          <button
            className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white dark:text-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;