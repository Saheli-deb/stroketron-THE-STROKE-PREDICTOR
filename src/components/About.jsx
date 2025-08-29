import React from "react";

const About = () => (
  <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
    <h2 className="text-4xl font-bold text-indigo-200 mb-4">About Stroketron</h2>
    <div className="bg-white/10 rounded-lg p-8 shadow-lg max-w-2xl text-indigo-100">
      <p className="mb-4">
        <span className="font-bold text-yellow-300">Stroketron</span> is an AI-powered web application designed to help users assess their risk of stroke quickly and securely. Our mission is to empower individuals with accessible, private, and actionable health insights, enabling early intervention and prevention.
      </p>
      <p className="mb-4">
        Built with modern technology and a focus on user experience, Stroketron provides instant predictions, downloadable reports, and educational resources to help you take control of your health journey.
      </p>
      <p>
        <span className="font-bold">Disclaimer:</span> Stroketron is not a substitute for professional medical advice. Always consult a healthcare provider for medical concerns.
      </p>
    </div>
  </section>
);

export default About; 