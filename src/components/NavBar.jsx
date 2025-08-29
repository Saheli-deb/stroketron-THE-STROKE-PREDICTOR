import React, { useEffect, useState } from "react";
import nexusLogo from "../assets/nexus-logo.png";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = () => {
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
            <Link to="/" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">Home</Link>
            <Link to="/predict" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">Predict</Link>
            <Link to="/reports" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">Reports</Link>
            <Link to="/history" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">History</Link>
            <Link to="/articles" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">Articles</Link>
            <Link to="/about" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">About</Link>
            <Link to="/faq" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">FAQ</Link>
            <Link to="/login" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">Login</Link>
            <Link to="/register" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">Register</Link>
            <Link to="/contact" tabIndex={0} className="text-white hover:text-yellow-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-300">Contact</Link>
          </div>
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