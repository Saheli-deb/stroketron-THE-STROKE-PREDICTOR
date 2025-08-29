import React, { useState } from "react";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";

const Contact = () => {
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
      <h2 className="text-4xl font-bold text-indigo-200 mb-4">Contact Us</h2>
      <div className="bg-white/10 rounded-lg p-8 shadow-lg max-w-lg w-full text-indigo-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaUser /> Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder="Your name" />
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaEnvelope /> Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder="Your email" />
          </div>
          <div className="flex flex-col">
            <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaCommentDots /> Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder="Your message" />
          </div>
          <button type="submit" className="w-full py-3 mt-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition">Send Message</button>
          {sent && <div className="mt-4 p-4 rounded-lg bg-green-200 text-green-800 font-semibold text-center">Message sent! We'll get back to you soon.</div>}
        </form>
        <div className="mt-8 text-indigo-200 text-sm text-center">
          Or email us at <a href="mailto:contact@stroketron.com" className="underline hover:text-yellow-300">contact@stroketron.com</a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 