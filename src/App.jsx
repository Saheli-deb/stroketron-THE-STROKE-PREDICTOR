import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PredictForm from "./components/PredictForm";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Reports from "./components/Reports";
import About from "./components/About";
import Contact from "./components/Contact";
import StrokeChatbot from "./components/StrokeChatbot";
import PredictionHistory from "./components/PredictionHistory";
import EducationalArticles from "./components/EducationalArticles";

// Placeholder FAQ/Testimonials page
const FAQ = () => (
  <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
    <h2 className="text-4xl font-bold text-indigo-200 mb-4">FAQ & Testimonials</h2>
    <div className="bg-white/10 rounded-lg p-6 text-indigo-100 max-w-2xl">
      <h3 className="text-xl font-semibold mb-2">Is my data safe?</h3>
      <p className="mb-4">Yes! All predictions are confidential and never shared.</p>
      <h3 className="text-xl font-semibold mb-2">How accurate is the prediction?</h3>
      <p className="mb-4">Our AI is trained on medical data, but always consult a doctor for medical advice.</p>
      <h3 className="text-xl font-semibold mb-2">User Testimonial</h3>
      <blockquote className="italic border-l-4 border-indigo-400 pl-4">“This tool gave me peace of mind and helped me take action early!”</blockquote>
    </div>
  </section>
);

function Home({ onNav }) {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 pointer-events-none" />
      <h1 className="text-5xl md:text-7xl font-extrabold text-white dark:text-yellow-200 mb-6 drop-shadow-lg">
        Predict Your <span className="text-indigo-400 dark:text-yellow-400">Stroke Risk</span> Instantly with <span className="text-yellow-300">Stroketron</span>
      </h1>
      <p className="text-lg md:text-2xl text-indigo-100 dark:text-yellow-100 mb-8 max-w-2xl mx-auto">
        Stroketron uses advanced AI to help you assess your risk of stroke in seconds. Get personalized insights and a downloadable report—fast, private, and secure.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <a href="/predict" className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900 rounded-lg text-lg font-semibold shadow-lg transition">Get Started</a>
        <a href="/register" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-indigo-100 dark:bg-yellow-100/10 dark:text-yellow-100 rounded-lg text-lg font-semibold border border-indigo-400 dark:border-yellow-400 shadow-lg transition">Register</a>
      </div>
      {/* About Section */}
      <div id="about" className="bg-white/10 dark:bg-yellow-100/10 rounded-xl p-8 max-w-3xl mx-auto mt-8 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-200 dark:text-yellow-200 mb-2">What is Stroketron?</h2>
        <p className="text-indigo-100 dark:text-yellow-100 mb-2">Stroke is a leading cause of death and disability worldwide. Early prediction and prevention can save lives. Our AI-powered tool analyzes your health data to estimate your risk and guide you toward a healthier future.</p>
        <p className="text-indigo-100 dark:text-yellow-100">Your privacy is our priority. All predictions are confidential and secure.</p>
      </div>
    </section>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-x-hidden">
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full pt-12 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register onRegistered={() => {}} />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/predict" element={<PredictForm username={loggedInUser} />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/history" element={<PredictionHistory username={loggedInUser} />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles" element={<EducationalArticles />} />
          </Routes>
      </main>
        <Footer />
        <StrokeChatbot />
    </div>
    </Router>
  );
}

export default App;
