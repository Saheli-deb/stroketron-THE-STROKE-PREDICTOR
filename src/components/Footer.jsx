import React from "react";

const Footer = () => (
  <footer className="bg-blue-900 text-white py-6 mt-12 shadow-inner">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-2 md:mb-0">
        &copy; {new Date().getFullYear()} Nexus. All rights reserved.
      </div>
      <div className="space-x-6">
        <a href="#about" className="hover:text-yellow-300 transition">About</a>
        <a href="#contact" className="hover:text-yellow-300 transition">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer; 