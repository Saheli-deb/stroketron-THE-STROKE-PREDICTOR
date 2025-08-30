import React, { useState } from "react";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";

const TEXT = {
  en: {
    title: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Your message",
    send: "Send Message",
    sent: "Message sent! We'll get back to you soon.",
    orEmail: "Or email us at",
  },
  hi: {
    title: "संपर्क करें",
    name: "नाम",
    email: "ईमेल",
    message: "संदेश",
    namePlaceholder: "आपका नाम",
    emailPlaceholder: "आपका ईमेल",
    messagePlaceholder: "आपका संदेश",
    send: "संदेश भेजें",
    sent: "संदेश भेज दिया गया! हम जल्द ही आपसे संपर्क करेंगे।",
    orEmail: "या हमें ईमेल करें",
  },
  bn: {
    title: "যোগাযোগ করুন",
    name: "নাম",
    email: "ইমেইল",
    message: "বার্তা",
    namePlaceholder: "আপনার নাম",
    emailPlaceholder: "আপনার ইমেইল",
    messagePlaceholder: "আপনার বার্তা",
    send: "বার্তা পাঠান",
    sent: "বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    orEmail: "অথবা আমাদের ইমেইল করুন",
  }
};

const Contact = ({ language = "en" }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="flex flex-col items-center justify-center py-16 min-h-[60vh]">
      <h2 className="text-4xl font-bold text-indigo-200 mb-4">{TEXT[language].title}</h2>
      <div className="bg-white/10 rounded-lg p-8 shadow-lg max-w-lg w-full text-indigo-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaUser /> {TEXT[language].name}</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder={TEXT[language].namePlaceholder} />
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaEnvelope /> {TEXT[language].email}</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder={TEXT[language].emailPlaceholder} />
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaCommentDots /> {TEXT[language].message}</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder={TEXT[language].messagePlaceholder} />
          </div>
          <button type="submit" className="w-full py-3 mt-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition">{TEXT[language].send}</button>
          {sent && <div className="mt-4 p-4 rounded-lg bg-green-200 text-green-800 font-semibold text-center">{TEXT[language].sent}</div>}
        </form>
        <div className="mt-8 text-indigo-200 text-sm text-center">
          {TEXT[language].orEmail} <a href="mailto:contact@stroketron.com" className="underline hover:text-yellow-300">contact@stroketron.com</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;