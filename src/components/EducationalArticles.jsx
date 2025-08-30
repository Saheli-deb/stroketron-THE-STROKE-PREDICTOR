import React from "react";
import { FaBookOpen, FaVideo, FaImage } from "react-icons/fa";

const TEXT = {
  en: {
    pageTitle: "Educational Articles",
    readMore: "Read more",
    articles: [
      {
        title: "Understanding Stroke: Causes and Types",
        type: "article",
        url: "https://www.cdc.gov/stroke/types_of_stroke.htm",
        desc: "Learn about the different types of stroke, their causes, and how they affect the brain.",
      },
      {
        title: "Stroke Warning Signs (Infographic)",
        type: "infographic",
        url: "https://www.stroke.org/-/media/Stroke-Files/Infographics/Stroke-Warning-Signs-Infographic.pdf",
        desc: "A visual guide to recognizing the warning signs of stroke.",
      },
      {
        title: "Stroke Prevention Tips (Video)",
        type: "video",
        url: "https://www.youtube.com/watch?v=ryIGnzodxDs",
        desc: "Watch this video for practical tips on reducing your risk of stroke.",
      },
    ],
  },
  hi: {
    pageTitle: "शैक्षिक लेख",
    readMore: "और पढ़ें",
    articles: [
      {
        title: "स्ट्रोक को समझना: कारण और प्रकार",
        type: "article",
        url: "https://www.cdc.gov/stroke/types_of_stroke.htm",
        desc: "स्ट्रोक के विभिन्न प्रकार, उनके कारण और वे मस्तिष्क को कैसे प्रभावित करते हैं, जानें।",
      },
      {
        title: "स्ट्रोक चेतावनी संकेत (इन्फोग्राफिक)",
        type: "infographic",
        url: "https://www.stroke.org/-/media/Stroke-Files/Infographics/Stroke-Warning-Signs-Infographic.pdf",
        desc: "स्ट्रोक के चेतावनी संकेतों को पहचानने के लिए एक दृश्य मार्गदर्शिका।",
      },
      {
        title: "स्ट्रोक रोकथाम के टिप्स (वीडियो)",
        type: "video",
        url: "https://www.youtube.com/watch?v=ryIGnzodxDs",
        desc: "स्ट्रोक के जोखिम को कम करने के लिए व्यावहारिक सुझावों के लिए यह वीडियो देखें।",
      },
    ],
  },
  bn: {
    pageTitle: "শিক্ষামূলক প্রবন্ধ",
    readMore: "আরও পড়ুন",
    articles: [
      {
        title: "স্ট্রোক বোঝা: কারণ ও ধরন",
        type: "article",
        url: "https://www.cdc.gov/stroke/types_of_stroke.htm",
        desc: "স্ট্রোকের বিভিন্ন ধরন, তাদের কারণ এবং তারা কীভাবে মস্তিষ্ককে প্রভাবিত করে তা জানুন।",
      },
      {
        title: "স্ট্রোক সতর্কতা চিহ্ন (ইনফোগ্রাফিক)",
        type: "infographic",
        url: "https://www.stroke.org/-/media/Stroke-Files/Infographics/Stroke-Warning-Signs-Infographic.pdf",
        desc: "স্ট্রোকের সতর্কতা চিহ্নগুলি চিনতে একটি ভিজ্যুয়াল গাইড।",
      },
      {
        title: "স্ট্রোক প্রতিরোধের টিপস (ভিডিও)",
        type: "video",
        url: "https://www.youtube.com/watch?v=ryIGnzodxDs",
        desc: "স্ট্রোকের ঝুঁকি কমানোর জন্য ব্যবহারিক টিপসের ভিডিও দেখুন।",
      },
    ],
  },
};

const iconForType = (type) => {
  if (type === "article") return <FaBookOpen className="text-indigo-400 text-2xl" />;
  if (type === "infographic") return <FaImage className="text-pink-400 text-2xl" />;
  if (type === "video") return <FaVideo className="text-yellow-400 text-2xl" />;
  return null;
};

const EducationalArticles = ({ language = "en" }) => (
  <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
    <h2 className="text-4xl font-bold text-indigo-200 mb-8 flex items-center gap-2">
      <FaBookOpen className="text-yellow-300" /> {TEXT[language].pageTitle}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      {TEXT[language].articles.map((a, i) => (
        <a
          key={i}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 transition rounded-xl p-6 shadow-lg flex flex-col gap-3 text-indigo-100 hover:text-indigo-900 border border-indigo-200 hover:border-indigo-400"
        >
          <div className="flex items-center gap-3 mb-2">
            {iconForType(a.type)}
            <span className="text-xl font-bold">{a.title}</span>
          </div>
          <p className="text-indigo-200 text-sm mb-2">{a.desc}</p>
          <span className="text-xs font-semibold underline">{TEXT[language].readMore}</span>
        </a>
      ))}
    </div>
  </section>
);

export default EducationalArticles;