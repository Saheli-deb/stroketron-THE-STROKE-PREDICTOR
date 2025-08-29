import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaLink } from "react-icons/fa";

const FAQ_ANSWERS = {
  "what is a stroke": "A stroke occurs when blood flow to a part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients.",
  "symptoms": "Common symptoms of stroke include sudden numbness, confusion, trouble speaking, vision problems, dizziness, or severe headache.",
  "risk factors": "Major risk factors include high blood pressure, diabetes, smoking, obesity, and high cholesterol.",
  "prevention": "You can reduce your risk by maintaining a healthy lifestyle: exercise, eat well, avoid smoking, and manage chronic conditions.",
  "treatment": "Immediate medical attention is critical. Treatments depend on the type of stroke and may include medication or surgery.",
  "is stroke preventable": "Many strokes can be prevented by controlling risk factors and living a healthy lifestyle.",
};

const SUGGESTIONS = [
  "What is a stroke?",
  "What are the symptoms?",
  "What are the risk factors?",
  "How can I prevent a stroke?",
  "What is the treatment for stroke?",
];

const RESOURCES = [
  { name: "World Health Organization: Stroke", url: "https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death" },
  { name: "CDC: Stroke Information", url: "https://www.cdc.gov/stroke/index.htm" },
  { name: "American Stroke Association", url: "https://www.stroke.org/" },
];

function getBotResponse(input) {
  const text = input.toLowerCase();
  for (const key in FAQ_ANSWERS) {
    if (text.includes(key)) return FAQ_ANSWERS[key];
  }
  return "I'm here to help with stroke-related questions! Try asking about symptoms, risk factors, or prevention.";
}

const StrokeChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your Stroke Info Bot. Ask me anything about stroke." },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = (e, overrideInput) => {
    if (e) e.preventDefault();
    const question = overrideInput !== undefined ? overrideInput : input;
    if (!question.trim()) return;
    const userMsg = { sender: "user", text: question };
    setMessages((msgs) => [...msgs, userMsg]);
    setTimeout(() => {
      const botReply = { sender: "bot", text: getBotResponse(question) };
      setMessages((msgs) => [...msgs, botReply]);
    }, 600);
    setInput("");
  };

  return (
    <>
      {/* Floating Chatbot Icon Button */}
      <button
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 border-4 border-white group ${open ? 'hidden' : ''}`}
        aria-label="Open Stroke Chatbot"
        onClick={() => setOpen(true)}
        title="Chat with StrokeBot"
      >
        <FaRobot className="text-yellow-300 text-3xl animate-bounce group-hover:animate-none" />
      </button>

      {/* Chatbot Modal/Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
          <div className="w-80 max-w-full m-6 pointer-events-auto">
            <div className="bg-white/95 rounded-2xl shadow-2xl border border-indigo-300 flex flex-col h-[30rem] relative animate-fadeInUp">
              {/* Header */}
              <div className="bg-indigo-700 text-white rounded-t-2xl px-4 py-3 flex items-center justify-between">
                <span className="flex items-center gap-2"><FaRobot className="text-yellow-300" /> Stroke Chatbot</span>
                <button
                  className="ml-2 p-1 rounded-full hover:bg-indigo-800 transition"
                  aria-label="Close chatbot"
                  onClick={() => setOpen(false)}
                >
                  <FaTimes className="text-white text-lg" />
                </button>
              </div>
              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-indigo-50 rounded-b-2xl">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow ${msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-white text-indigo-900"}`}>
                      {msg.sender === "user" ? <FaUser className="inline mr-1" /> : <FaRobot className="inline mr-1 text-yellow-400" />} {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              {/* Input */}
              <form onSubmit={handleSend} className="flex items-center p-2 border-t border-indigo-200 bg-white/80 rounded-b-2xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about stroke..."
                  className="flex-1 px-3 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-900"
                />
                <button type="submit" className="ml-2 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition">
                  <FaPaperPlane />
                </button>
              </form>
              {/* Suggestions */}
              <div className="px-4 py-2 bg-indigo-100 border-t border-indigo-200 flex flex-wrap gap-2 rounded-b-2xl">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    className="bg-indigo-200 hover:bg-indigo-300 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold transition shadow"
                    onClick={() => handleSend(null, s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {/* Resource Links */}
              <div className="px-4 py-2 bg-white border-t border-indigo-100 rounded-b-2xl text-xs text-indigo-700 flex flex-col gap-1">
                <span className="font-semibold flex items-center gap-1"><FaLink /> Helpful Resources:</span>
                {RESOURCES.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500 flex items-center gap-1">
                    <FaLink className="text-indigo-400" /> {r.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StrokeChatbot; 