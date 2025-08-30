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

// Multilingual text dictionary
const TEXT = {
  en: {
    faqTitle: "FAQ & Testimonials",
    faqSafe: "Is my data safe?",
    faqSafeAns: "Yes! All predictions are confidential and never shared.",
    faqAcc: "How accurate is the prediction?",
    faqAccAns: "Our AI is trained on medical data, but always consult a doctor for medical advice.",
    faqTest: "User Testimonial",
    faqTestAns: "“This tool gave me peace of mind and helped me take action early!”",
    homeTitle: "Predict Your Stroke Risk Instantly with Stroketron",
    homeHighlight: "Stroke Risk",
    homeHighlight2: "Stroketron",
    homeDesc: "Stroketron uses advanced AI to help you assess your risk of stroke in seconds. Get personalized insights and a downloadable report—fast, private, and secure.",
    getStarted: "Get Started",
    register: "Register",
    aboutTitle: "What is Stroketron?",
    aboutDesc1: "Stroke is a leading cause of death and disability worldwide. Early prediction and prevention can save lives. Our AI-powered tool analyzes your health data to estimate your risk and guide you toward a healthier future.",
    aboutDesc2: "Your privacy is our priority. All predictions are confidential and secure.",
    langEnglish: "English",
    langHindi: "हिन्दी",
    langBengali: "বাংলা",
    contactTitle: "Contact Us",
    contactDesc: "Have questions or feedback? Reach out to us!",
    contactName: "Your Name",
    contactEmail: "Your Email",
    contactMsg: "Message",
    contactSend: "Send",
    reportsTitle: "Your Stroketron Reports",
    reportsDesc: "Download your Stroketron stroke prediction reports below.",
    reportsNo: "No reports available.",
    reportsDownload: "Download",
    historyTitle: "Prediction History",
    historyDesc: "View your previous stroke risk predictions.",
    articlesTitle: "Educational Articles",
    articlesDesc: "Learn more about stroke prevention and health.",
    registerTitle: "Register",
    registerBtn: "Register",
    loginTitle: "Login",
    loginBtn: "Login",
    predictTitle: "Stroke Risk Prediction",
    predictBtn: "Predict",
    aboutTitle: "What is Stroketron?",
    aboutDesc1: "Stroke is a leading cause of death and disability worldwide. Early prediction and prevention can save lives. Our AI-powered tool analyzes your health data to estimate your risk and guide you toward a healthier future.",
    aboutDesc2: "Your privacy is our priority. All predictions are confidential and secure."
  },
  hi: {
    faqTitle: "सामान्य प्रश्न और प्रशंसापत्र",
    faqSafe: "क्या मेरा डेटा सुरक्षित है?",
    faqSafeAns: "हाँ! सभी पूर्वानुमान गोपनीय हैं और कभी साझा नहीं किए जाते।",
    faqAcc: "पूर्वानुमान कितना सटीक है?",
    faqAccAns: "हमारा एआई मेडिकल डेटा पर प्रशिक्षित है, लेकिन हमेशा डॉक्टर से सलाह लें।",
    faqTest: "उपयोगकर्ता प्रशंसापत्र",
    faqTestAns: "“इस टूल ने मुझे मानसिक शांति दी और जल्दी कार्रवाई करने में मदद की!”",
    homeTitle: "Stroketron के साथ तुरंत अपने स्ट्रोक जोखिम की भविष्यवाणी करें",
    homeHighlight: "स्ट्रोक जोखिम",
    homeHighlight2: "स्ट्रोकेट्रॉन",
    homeDesc: "Stroketron उन्नत एआई का उपयोग करके आपके स्ट्रोक जोखिम का आकलन सेकंडों में करता है। व्यक्तिगत जानकारी और डाउनलोड करने योग्य रिपोर्ट प्राप्त करें—तेज़, निजी और सुरक्षित।",
    getStarted: "शुरू करें",
    register: "रजिस्टर करें",
    aboutTitle: "Stroketron क्या है?",
    aboutDesc1: "स्ट्रोक दुनिया भर में मृत्यु और विकलांगता का प्रमुख कारण है। जल्दी पूर्वानुमान और रोकथाम जीवन बचा सकते हैं। हमारा एआई-पावर्ड टूल आपके स्वास्थ्य डेटा का विश्लेषण करके आपके जोखिम का अनुमान लगाता है और आपको स्वस्थ भविष्य की ओर मार्गदर्शन करता है।",
    aboutDesc2: "आपकी गोपनीयता हमारी प्राथमिकता है। सभी पूर्वानुमान गोपनीय और सुरक्षित हैं।",
    langEnglish: "English",
    langHindi: "हिन्दी",
    langBengali: "বাংলা",
    contactTitle: "संपर्क करें",
    contactDesc: "कोई प्रश्न या सुझाव है? हमसे संपर्क करें!",
    contactName: "आपका नाम",
    contactEmail: "आपका ईमेल",
    contactMsg: "संदेश",
    contactSend: "भेजें",
    reportsTitle: "आपकी स्ट्रोकेट्रॉन रिपोर्ट्स",
    reportsDesc: "नीचे अपनी स्ट्रोकेट्रॉन स्ट्रोक पूर्वानुमान रिपोर्ट डाउनलोड करें।",
    reportsNo: "कोई रिपोर्ट उपलब्ध नहीं है।",
    reportsDownload: "डाउनलोड करें",
    historyTitle: "पूर्वानुमान इतिहास",
    historyDesc: "अपने पिछले स्ट्रोक जोखिम पूर्वानुमान देखें।",
    articlesTitle: "शैक्षिक लेख",
    articlesDesc: "स्ट्रोक रोकथाम और स्वास्थ्य के बारे में अधिक जानें।",
    registerTitle: "रजिस्टर करें",
    registerBtn: "रजिस्टर करें",
    loginTitle: "लॉगिन",
    loginBtn: "लॉगिन करें",
    predictTitle: "स्ट्रोक जोखिम पूर्वानुमान",
    predictBtn: "पूर्वानुमान करें",
    aboutTitle: "Stroketron क्या है?",
    aboutDesc1: "स्ट्रोक दुनिया भर में मृत्यु और विकलांगता का प्रमुख कारण है। जल्दी पूर्वानुमान और रोकथाम जीवन बचा सकते हैं। हमारा एआई-पावर्ड टूल आपके स्वास्थ्य डेटा का विश्लेषण करके आपके जोखिम का अनुमान लगाता है और आपको स्वस्थ भविष्य की ओर मार्गदर्शन करता है।",
    aboutDesc2: "आपकी गोपनीयता हमारी प्राथमिकता है। सभी पूर्वानुमान गोपनीय और सुरक्षित हैं।"
  },
  bn: {
    faqTitle: "প্রশ্নোত্তর ও প্রশংসাপত্র",
    faqSafe: "আমার তথ্য কি নিরাপদ?",
    faqSafeAns: "হ্যাঁ! সকল পূর্বাভাস গোপনীয় এবং কখনও শেয়ার করা হয় না।",
    faqAcc: "পূর্বাভাস কতটা নির্ভুল?",
    faqAccAns: "আমাদের এআই মেডিকেল ডেটা দিয়ে প্রশিক্ষিত, তবে সর্বদা ডাক্তারের পরামর্শ নিন।",
    faqTest: "ব্যবহারকারীর প্রশংসাপত্র",
    faqTestAns: "“এই টুলটি আমাকে মানসিক শান্তি দিয়েছে এবং দ্রুত পদক্ষেপ নিতে সাহায্য করেছে!”",
    homeTitle: "Stroketron দিয়ে মুহূর্তেই আপনার স্ট্রোক ঝুঁকি অনুমান করুন",
    homeHighlight: "স্ট্রোক ঝুঁকি",
    homeHighlight2: "স্ট্রোকেট্রন",
    homeDesc: "Stroketron উন্নত AI ব্যবহার করে সেকেন্ডে আপনার স্ট্রোক ঝুঁকি মূল্যায়ন করে। ব্যক্তিগত তথ্য এবং ডাউনলোডযোগ্য রিপোর্ট পান—দ্রুত, ব্যক্তিগত এবং নিরাপদ।",
    getStarted: "শুরু করুন",
    register: "রেজিস্টার করুন",
    aboutTitle: "Stroketron কী?",
    aboutDesc1: "স্ট্রোক বিশ্বব্যাপী মৃত্যু ও অক্ষমতার প্রধান কারণ। দ্রুত পূর্বাভাস এবং প্রতিরোধ জীবন বাঁচাতে পারে। আমাদের AI-চালিত টুল আপনার স্বাস্থ্য তথ্য বিশ্লেষণ করে আপনার ঝুঁকি অনুমান করে এবং আপনাকে একটি সুস্থ ভবিষ্যতের দিকে নির্দেশ করে।",
    aboutDesc2: "আপনার গোপনীয়তা আমাদের অগ্রাধিকার। সকল পূর্বাভাস গোপনীয় এবং নিরাপদ।",
    langEnglish: "English",
    langHindi: "হিন্দি",
    langBengali: "বাংলা",
    contactTitle: "যোগাযোগ করুন",
    contactDesc: "প্রশ্ন বা মতামত আছে? আমাদের সাথে যোগাযোগ করুন!",
    contactName: "আপনার নাম",
    contactEmail: "আপনার ইমেইল",
    contactMsg: "বার্তা",
    contactSend: "পাঠান",
    reportsTitle: "আপনার স্ট্রোকেট্রন রিপোর্ট",
    reportsDesc: "নিচে আপনার স্ট্রোকেট্রন স্ট্রোক পূর্বাভাস রিপোর্ট ডাউনলোড করুন।",
    reportsNo: "কোনো রিপোর্ট নেই।",
    reportsDownload: "ডাউনলোড করুন",
    historyTitle: "পূর্বাভাস ইতিহাস",
    historyDesc: "আপনার পূর্ববর্তী স্ট্রোক ঝুঁকি পূর্বাভাস দেখুন।",
    articlesTitle: "শিক্ষামূলক প্রবন্ধ",
    articlesDesc: "স্ট্রোক প্রতিরোধ ও স্বাস্থ্য সম্পর্কে আরও জানুন।",
    registerTitle: "রেজিস্টার করুন",
    registerBtn: "রেজিস্টার করুন",
    loginTitle: "লগইন",
    loginBtn: "লগইন করুন",
    predictTitle: "স্ট্রোক ঝুঁকি পূর্বাভাস",
    predictBtn: "পূর্বাভাস করুন",
    aboutTitle: "Stroketron কী?",
    aboutDesc1: "স্ট্রোক বিশ্বব্যাপী মৃত্যু ও অক্ষমতার প্রধান কারণ। দ্রুত পূর্বাভাস এবং প্রতিরোধ জীবন বাঁচাতে পারে। আমাদের AI-চালিত টুল আপনার স্বাস্থ্য তথ্য বিশ্লেষণ করে আপনার ঝুঁকি অনুমান করে এবং আপনাকে একটি সুস্থ ভবিষ্যতের দিকে নির্দেশ করে।",
    aboutDesc2: "আপনার গোপনীয়তা আমাদের অগ্রাধিকার। সকল পূর্বাভাস গোপনীয় এবং নিরাপদ।"
  }
};

// Language selector component
function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <label className="text-indigo-100 font-semibold">Language:</label>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="p-2 rounded bg-white/20 text-white dark:text-yellow-300"
      >
        <option value="en">{TEXT.en.langEnglish}</option>
        <option value="hi">{TEXT.en.langHindi}</option>
        <option value="bn">{TEXT.en.langBengali}</option>
      </select>
    </div>
  );
}

const FAQ = ({ language }) => (
  <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
    <h2 className="text-4xl font-bold text-indigo-200 mb-4">{TEXT[language].faqTitle}</h2>
    <div className="bg-white/10 rounded-lg p-6 text-indigo-100 max-w-2xl">
      <h3 className="text-xl font-semibold mb-2">{TEXT[language].faqSafe}</h3>
      <p className="mb-4">{TEXT[language].faqSafeAns}</p>
      <h3 className="text-xl font-semibold mb-2">{TEXT[language].faqAcc}</h3>
      <p className="mb-4">{TEXT[language].faqAccAns}</p>
      <h3 className="text-xl font-semibold mb-2">{TEXT[language].faqTest}</h3>
      <blockquote className="italic border-l-4 border-indigo-400 pl-4">{TEXT[language].faqTestAns}</blockquote>
    </div>
  </section>
);

function Home({ language }) {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 pointer-events-none" />
      <h1 className="text-5xl md:text-7xl font-extrabold text-white dark:text-yellow-200 mb-6 drop-shadow-lg">
        {TEXT[language].homeTitle}
      </h1>
      <p className="text-lg md:text-2xl text-indigo-100 dark:text-yellow-100 mb-8 max-w-2xl mx-auto">
        {TEXT[language].homeDesc}
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <a href="/predict" className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900 rounded-lg text-lg font-semibold shadow-lg transition">{TEXT[language].getStarted}</a>
        <a href="/register" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-indigo-100 dark:bg-yellow-100/10 dark:text-yellow-100 rounded-lg text-lg font-semibold border border-indigo-400 dark:border-yellow-400 shadow-lg transition">{TEXT[language].register}</a>
      </div>
      {/* About Section */}
      <div id="about" className="bg-white/10 dark:bg-yellow-100/10 rounded-xl p-8 max-w-3xl mx-auto mt-8 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-200 dark:text-yellow-200 mb-2">{TEXT[language].aboutTitle}</h2>
        <p className="text-indigo-100 dark:text-yellow-100 mb-2">{TEXT[language].aboutDesc1}</p>
        <p className="text-indigo-100 dark:text-yellow-100">{TEXT[language].aboutDesc2}</p>
      </div>
    </section>
  );
}

// Multilingual wrapper for each page
function MultilingualRegister({ language }) {
  return <Register title={TEXT[language].registerTitle} btnText={TEXT[language].registerBtn} />;
}
function MultilingualLogin({ language, onLoginSuccess }) {
  return <Login title={TEXT[language].loginTitle} btnText={TEXT[language].loginBtn} onLoginSuccess={onLoginSuccess} />;
}
function MultilingualPredictForm({ language, username }) {
  return <PredictForm title={TEXT[language].predictTitle} btnText={TEXT[language].predictBtn} username={username} />;
}
function MultilingualReports({ language }) {
  return <Reports title={TEXT[language].reportsTitle} desc={TEXT[language].reportsDesc} noReports={TEXT[language].reportsNo} downloadText={TEXT[language].reportsDownload} language={language} />;
}
function MultilingualAbout({ language }) {
  return <About title={TEXT[language].aboutTitle} desc1={TEXT[language].aboutDesc1} desc2={TEXT[language].aboutDesc2} />;
}
function MultilingualContact({ language }) {
  return <Contact title={TEXT[language].contactTitle} desc={TEXT[language].contactDesc} nameLabel={TEXT[language].contactName} emailLabel={TEXT[language].contactEmail} msgLabel={TEXT[language].contactMsg} sendText={TEXT[language].contactSend} />;
}
function MultilingualHistory({ language, username }) {
  return <PredictionHistory title={TEXT[language].historyTitle} desc={TEXT[language].historyDesc} username={username} />;
}
function MultilingualArticles({ language }) {
  return <EducationalArticles title={TEXT[language].articlesTitle} desc={TEXT[language].articlesDesc} />;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [language, setLanguage] = useState("en");

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-x-hidden">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <NavBar language={language} setLanguage={setLanguage} />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full pt-12 pb-12">
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/register" element={<MultilingualRegister language={language} />} />
            <Route path="/login" element={<MultilingualLogin language={language} onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/predict" element={<MultilingualPredictForm language={language} username={loggedInUser} />} />
            <Route path="/reports" element={<MultilingualReports language={language} />} />
            <Route path="/history" element={<MultilingualHistory language={language} username={loggedInUser} />} />
            <Route path="/about" element={<MultilingualAbout language={language} />} />
            <Route path="/faq" element={<FAQ language={language} />} />
            <Route path="/contact" element={<MultilingualContact language={language} />} />
            <Route path="/articles" element={<MultilingualArticles language={language} />} />
          </Routes>
        </main>
        <Footer />
        <StrokeChatbot />
      </div>
    </Router>
  );
}

export default App;
