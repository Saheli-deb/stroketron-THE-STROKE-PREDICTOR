import React from "react";

const TEXT = {
  en: {
    title: "About Stroketron",
    p1: "Stroketron is an AI-powered web application designed to help users assess their risk of stroke quickly and securely. Our mission is to empower individuals with accessible, private, and actionable health insights, enabling early intervention and prevention.",
    p2: "Built with modern technology and a focus on user experience, Stroketron provides instant predictions, downloadable reports, and educational resources to help you take control of your health journey.",
    disclaimer: "Disclaimer: Stroketron is not a substitute for professional medical advice. Always consult a healthcare provider for medical concerns."
  },
  hi: {
    title: "स्ट्रोकेट्रॉन के बारे में",
    p1: "स्ट्रोकेट्रॉन एक एआई-संचालित वेब एप्लिकेशन है जो उपयोगकर्ताओं को स्ट्रोक के जोखिम का आकलन जल्दी और सुरक्षित रूप से करने में मदद करता है। हमारा उद्देश्य लोगों को सुलभ, निजी और व्यावहारिक स्वास्थ्य जानकारी देकर समय पर हस्तक्षेप और रोकथाम को सक्षम बनाना है।",
    p2: "आधुनिक तकनीक और उपयोगकर्ता अनुभव पर ध्यान केंद्रित करते हुए, स्ट्रोकेट्रॉन त्वरित पूर्वानुमान, डाउनलोड करने योग्य रिपोर्ट और शैक्षिक संसाधन प्रदान करता है ताकि आप अपने स्वास्थ्य यात्रा को नियंत्रित कर सकें।",
    disclaimer: "अस्वीकरण: स्ट्रोकेट्रॉन पेशेवर चिकित्सा सलाह का विकल्प नहीं है। किसी भी चिकित्सा चिंता के लिए हमेशा स्वास्थ्य सेवा प्रदाता से परामर्श करें।"
  },
  bn: {
    title: "স্ট্রোকেট্রন সম্পর্কে",
    p1: "স্ট্রোকেট্রন একটি AI-চালিত ওয়েব অ্যাপ্লিকেশন যা ব্যবহারকারীদের দ্রুত এবং নিরাপদে স্ট্রোকের ঝুঁকি মূল্যায়ন করতে সহায়তা করে। আমাদের লক্ষ্য হল সহজলভ্য, ব্যক্তিগত এবং কার্যকর স্বাস্থ্য তথ্য দিয়ে ব্যক্তিদের ক্ষমতায়ন করা, যাতে দ্রুত পদক্ষেপ ও প্রতিরোধ সম্ভব হয়।",
    p2: "আধুনিক প্রযুক্তি এবং ব্যবহারকারীর অভিজ্ঞতার উপর গুরুত্ব দিয়ে, স্ট্রোকেট্রন তাৎক্ষণিক পূর্বাভাস, ডাউনলোডযোগ্য রিপোর্ট এবং শিক্ষামূলক সম্পদ প্রদান করে যাতে আপনি আপনার স্বাস্থ্য যাত্রা নিয়ন্ত্রণ করতে পারেন।",
    disclaimer: "দায়বদ্ধতা: স্ট্রোকেট্রন পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়। চিকিৎসা সংক্রান্ত বিষয়ে সর্বদা স্বাস্থ্যসেবা প্রদানকারীর সাথে পরামর্শ করুন।"
  }
};

const About = ({ language = "en" }) => (
  <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
    <h2 className="text-4xl font-bold text-indigo-200 mb-4">{TEXT[language].title}</h2>
    <div className="bg-white/10 rounded-lg p-8 shadow-lg max-w-2xl text-indigo-100">
      <p className="mb-4">
        <span className="font-bold text-yellow-300">Stroketron</span> {TEXT[language].p1}
      </p>
      <p className="mb-4">
        {TEXT[language].p2}
      </p>
      <p>
        <span className="font-bold">Disclaimer:</span> {TEXT[language].disclaimer}
      </p>
    </div>
  </section>
);

export default About;