
// import React, { useState, useRef, useEffect } from "react";
// import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaLink, FaMicrophone } from "react-icons/fa";

// /* ===== Data ===== */
// const FAQ_ANSWERS = {
//   "what is a stroke":
//     "A stroke occurs when blood flow to a part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients.",
//   symptoms:
//     "Common symptoms of stroke include sudden numbness, confusion, trouble speaking, vision problems, dizziness, or severe headache.",
//   "risk factors":
//     "Major risk factors include high blood pressure, diabetes, smoking, obesity, and high cholesterol.",
//   prevention:
//     "You can reduce your risk by maintaining a healthy lifestyle: exercise, eat well, avoid smoking, and manage chronic conditions.",
//   treatment:
//     "Immediate medical attention is critical. Treatments depend on the type of stroke and may include medication or surgery.",
//   "is stroke preventable":
//     "Many strokes can be prevented by controlling risk factors and living a healthy lifestyle.",
// };

// const SUGGESTIONS = [
//   "What is a stroke?",
//   "What are the symptoms?",
//   "What are the risk factors?",
//   "How can I prevent a stroke?",
//   "What is the treatment for stroke?",
// ];

// const RESOURCES = [
//   { name: "World Health Organization: Stroke", url: "https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death" },
//   { name: "CDC: Stroke Information", url: "https://www.cdc.gov/stroke/index.htm" },
//   { name: "American Stroke Association", url: "https://www.stroke.org/" },
// ];

// /* ===== TTS endpoint ===== */
// const TTS_ENDPOINT =
//   (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/tts` : "/tts");

// /* ===== Helpers ===== */
// function getBotResponse(input) {
//   const text = (input || "").toLowerCase();
//   for (const key in FAQ_ANSWERS) if (text.includes(key)) return FAQ_ANSWERS[key];
//   return "I'm here to help with stroke-related questions! Try asking about symptoms, risk factors, or prevention.";
// }

// export default function StrokeChatbot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! I'm your Stroke Info Bot. Ask me anything about stroke." }]);
//   const [input, setInput] = useState("");
//   const [voiceOn, setVoiceOn] = useState(true);
//   const [listening, setListening] = useState(false);
//   const [lang, setLang] = useState("en");
//   const chatEndRef = useRef(null);

//   // Audio / TTS queue
//   const audioRef = useRef(null);
//   const userActivatedRef = useRef(false);
//   const speakQueueRef = useRef([]);
//   const speakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const langStateRef = useRef(lang);
//   useEffect(() => { langStateRef.current = lang; }, [lang]);

//   useEffect(() => {
//     if (open && chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages, open]);

//   const ensureAudio = () => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio();
//       audioRef.current.preload = "auto";
//     }
//     return audioRef.current;
//   };

//   const enableVoiceGesture = () => {
//     userActivatedRef.current = true;
//     const a = ensureAudio();
//     a.src = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA";
//     a.play().catch(() => {});
//   };

//   const resolveTtsParams = (code) => (code === "en" ? { lang: "en", tld: "co.in" } : { lang: code, tld: "com" });

//   const enqueueSpeak = (text) => {
//     if (!voiceOn || !text?.trim() || !userActivatedRef.current) return;
//     speakQueueRef.current.push(text);
//     if (!speakingRef.current) flushQueue();
//   };

//   const flushQueue = async () => {
//     if (speakingRef.current) return;
//     speakingRef.current = true;
//     try {
//       while (speakQueueRef.current.length) {
//         const text = speakQueueRef.current.shift();
//         const { lang, tld } = resolveTtsParams(langStateRef.current);
//         const res = await fetch(`${TTS_ENDPOINT}?text=${encodeURIComponent(text)}&lang=${lang}&tld=${tld}`);
//         if (!res.ok) throw new Error("TTS failed");
//         const blob = await res.blob();
//         const url = URL.createObjectURL(blob);
//         const audio = ensureAudio();
//         audio.src = url;
//         await audio.play().catch(() => {});
//         await new Promise((resolve) => {
//           const done = () => { audio.removeEventListener("ended", done); resolve(); };
//           audio.addEventListener("ended", done);
//         });
//       }
//     } finally {
//       speakingRef.current = false;
//     }
//   };

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = lang === "en" ? "en-US" : lang === "hi" ? "hi-IN" : "bn-IN";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onerror = (e) => console.error("STT error:", e);
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//       // 🔊 ensure audio is unlocked for STT-triggered sends
//       if (!userActivatedRef.current) enableVoiceGesture();
//       handleSend(undefined, transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const handleSend = (e, overrideInput) => {
//     if (e) e.preventDefault();
//     // 🔊 ensure audio is unlocked for Enter-key or programmatic sends
//     if (!userActivatedRef.current) enableVoiceGesture();

//     const question = overrideInput !== undefined ? overrideInput : input;
//     if (!question.trim()) return;

//     setMessages((msgs) => [...msgs, { sender: "user", text: question }]);

//     setTimeout(() => {
//       const replyText = getBotResponse(question);
//       setMessages((msgs) => {
//         const next = [...msgs, { sender: "bot", text: replyText }];
//         enqueueSpeak(replyText);
//         return next;
//       });
//     }, 400);

//     setInput("");
//   };

//   return (
//     <>
//       <button
//         className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 border-4 border-white group ${open ? "hidden" : ""}`}
//         aria-label="Open Stroke Chatbot"
//         onClick={() => setOpen(true)}
//       >
//         <FaRobot className="text-yellow-300 text-3xl animate-bounce group-hover:animate-none" />
//       </button>

//       {open && (
//         <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
//           <div className="w-80 max-w-full m-6 pointer-events-auto">
//             <div className="bg-white/95 rounded-2xl shadow-2xl border border-indigo-300 flex flex-col h-[32rem] relative animate-fadeInUp">
//               <div className="bg-indigo-700 text-white rounded-t-2xl px-4 py-3 flex items-center justify-between">
//                 <span className="flex items-center gap-2">
//                   <FaRobot className="text-yellow-300" /> Stroke Chatbot
//                 </span>
//                 <button className="ml-2 p-1 rounded-full hover:bg-indigo-800 transition" onClick={() => setOpen(false)}>
//                   <FaTimes className="text-white text-lg" />
//                 </button>
//               </div>

//               <div className="px-4 py-2 bg-indigo-50 border-b border-indigo-200 flex items-center gap-3 text-sm">
//                 <button onClick={enableVoiceGesture} className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
//                   Enable Voice
//                 </button>
//                 <label className="flex items-center gap-1">
//                   <input type="checkbox" checked={voiceOn} onChange={(e) => setVoiceOn(e.target.checked)} />
//                   <span className="text-indigo-900">Voice</span>
//                 </label>
//                 <select value={lang} onChange={(e) => setLang(e.target.value)} className="ml-auto border border-indigo-200 rounded-md px-2 py-1 text-indigo-900 bg-white">
//                   <option value="en">English</option>
//                   <option value="bn">Bengali</option>
//                   <option value="hi">Hindi</option>
//                 </select>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-indigo-50 rounded-b-2xl">
//                 {messages.map((msg, idx) => (
//                   <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                     <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow ${msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-white text-indigo-900"}`}>
//                       {msg.sender === "user" ? <FaUser className="inline mr-1" /> : <FaRobot className="inline mr-1 text-yellow-400" />} {msg.text}
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={chatEndRef} />
//               </div>

//               <form onSubmit={handleSend} className="flex items-center p-2 border-t border-indigo-200 bg-white/80 rounded-b-2xl">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Ask about stroke..."
//                   className="flex-1 px-3 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-900"
//                 />
//                 <button
//                   type="button"
//                   onClick={startListening}
//                   className={`ml-2 p-2 rounded-lg shadow transition ${listening ? "bg-red-500" : "bg-green-500 hover:bg-green-600"} text-white`}
//                   title="Voice Input"
//                 >
//                   <FaMicrophone />
//                 </button>
//                 <button
//                   type="submit"
//                   className="ml-2 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
//                   onClick={() => { if (!userActivatedRef.current) enableVoiceGesture(); }}
//                   title="Send"
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </form>

//               <div className="px-4 py-2 bg-indigo-100 border-t border-indigo-200 flex flex-wrap gap-2">
//                 {SUGGESTIONS.map((s, i) => (
//                   <button
//                     key={i}
//                     className="bg-indigo-200 hover:bg-indigo-300 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold transition shadow"
//                     onClick={() => { if (!userActivatedRef.current) enableVoiceGesture(); handleSend(undefined, s); }}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>

//               <div className="px-4 py-2 bg-white border-t border-indigo-100 rounded-b-2xl text-xs text-indigo-700 flex flex-col gap-1">
//                 <span className="font-semibold flex items-center gap-1"><FaLink /> Helpful Resources:</span>
//                 {RESOURCES.map((r, i) => (
//                   <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500 flex items-center gap-1">
//                     <FaLink className="text-indigo-400" /> {r.name}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// src/components/StrokeChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaLink, FaMicrophone } from "react-icons/fa";

/* ===== FAQ data ===== */
const FAQ_ANSWERS = {
  "what is a stroke":
    "A stroke occurs when blood flow to a part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients.",
  symptoms:
    "Common symptoms of stroke include sudden numbness, confusion, trouble speaking, vision problems, dizziness, or severe headache.",
  "risk factors":
    "Major risk factors include high blood pressure, diabetes, smoking, obesity, and high cholesterol.",
  prevention:
    "You can reduce your risk by maintaining a healthy lifestyle: exercise, eat well, avoid smoking, and manage chronic conditions.",
  treatment:
    "Immediate medical attention is critical. Treatments depend on the type of stroke and may include medication or surgery.",
  "is stroke preventable":
    "Many strokes can be prevented by controlling risk factors and living a healthy lifestyle.",
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

/* ===== TTS endpoint (proxied by Vite) ===== */
const TTS_ENDPOINT =
  (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/tts` : "/tts");

/* ===== Helpers ===== */
function getBotResponse(input) {
  const text = (input || "").toLowerCase();
  for (const key in FAQ_ANSWERS) if (text.includes(key)) return FAQ_ANSWERS[key];
  return "I'm here to help with stroke-related questions! Try asking about symptoms, risk factors, or prevention.";
}

export default function StrokeChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your Stroke Info Bot. Ask me anything about stroke." },
  ]);
  const [input, setInput] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en");
  const chatEndRef = useRef(null);

  // audio / tts state
  const audioRef = useRef(null);
  const userActivatedRef = useRef(false); // becomes true after a click gesture
  const speakQueueRef = useRef([]);
  const speakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const langStateRef = useRef(lang);
  useEffect(() => { langStateRef.current = lang; }, [lang]);

  useEffect(() => {
    if (open && chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "auto";
    }
    return audioRef.current;
  };

  // one-time "unlock" so the browser allows autoplay of TTS
  const enableVoiceGesture = () => {
    if (userActivatedRef.current) return;
    userActivatedRef.current = true;
    const a = ensureAudio();
    // silent click primer
    a.src = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA";
    a.play().catch(() => {});
  };

  const resolveTtsParams = (code) =>
    code === "en" ? { lang: "en", tld: "co.in" } : { lang: code, tld: "com" };

  const enqueueSpeak = (text) => {
    if (!voiceOn || !text?.trim() || !userActivatedRef.current) return;
    speakQueueRef.current.push(text);
    if (!speakingRef.current) flushQueue();
  };

  const flushQueue = async () => {
    if (speakingRef.current) return;
    speakingRef.current = true;
    try {
      while (speakQueueRef.current.length) {
        const text = speakQueueRef.current.shift();
        const { lang, tld } = resolveTtsParams(langStateRef.current);
        const res = await fetch(
          `${TTS_ENDPOINT}?text=${encodeURIComponent(text)}&lang=${lang}&tld=${tld}`
        );
        if (!res.ok) throw new Error("TTS failed");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = ensureAudio();
        audio.src = url;
        // play and wait for end
        await audio.play().catch(() => {});
        await new Promise((resolve) => {
          const done = () => { audio.removeEventListener("ended", done); resolve(); };
          audio.addEventListener("ended", done);
        });
      }
    } finally {
      speakingRef.current = false;
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang === "en" ? "en-US" : lang === "hi" ? "hi-IN" : "bn-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e) => console.error("STT error:", e);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // make sure audio is unlocked for STT-triggered sends
      if (!userActivatedRef.current) enableVoiceGesture();
      handleSend(undefined, transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleSend = (e, overrideInput) => {
    if (e) e.preventDefault();
    // ensure audio unlock even when sending via Enter key or programmatically
    if (!userActivatedRef.current) enableVoiceGesture();

    const question = overrideInput !== undefined ? overrideInput : input;
    if (!question.trim()) return;

    setMessages((msgs) => [...msgs, { sender: "user", text: question }]);

    setTimeout(() => {
      const replyText = getBotResponse(question);
      // append bot message
      setMessages((msgs) => [...msgs, { sender: "bot", text: replyText }]);
      // 🔊 IMPORTANT: speak outside updater to avoid double-call in React 18 StrictMode
      enqueueSpeak(replyText);
    }, 400);

    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 border-4 border-white group ${open ? "hidden" : ""}`}
        aria-label="Open Stroke Chatbot"
        onClick={() => setOpen(true)}
      >
        <FaRobot className="text-yellow-300 text-3xl animate-bounce group-hover:animate-none" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
          <div className="w-80 max-w-full m-6 pointer-events-auto">
            <div className="bg-white/95 rounded-2xl shadow-2xl border border-indigo-300 flex flex-col h-[32rem] relative animate-fadeInUp">
              {/* Header */}
              <div className="bg-indigo-700 text-white rounded-t-2xl px-4 py-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaRobot className="text-yellow-300" /> Stroke Chatbot
                </span>
                <button className="ml-2 p-1 rounded-full hover:bg-indigo-800 transition" onClick={() => setOpen(false)}>
                  <FaTimes className="text-white text-lg" />
                </button>
              </div>

              {/* Toolbar */}
              <div className="px-4 py-2 bg-indigo-50 border-b border-indigo-200 flex items-center gap-3 text-sm">
                <button
                  onClick={enableVoiceGesture}
                  className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Enable Voice
                </button>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={voiceOn}
                    onChange={(e) => setVoiceOn(e.target.checked)}
                  />
                  <span className="text-indigo-900">Voice</span>
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="ml-auto border border-indigo-200 rounded-md px-2 py-1 text-indigo-900 bg-white"
                >
                  <option value="en">English</option>
                  <option value="bn">Bengali</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-indigo-50 rounded-b-2xl">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow ${
                        msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-white text-indigo-900"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <FaUser className="inline mr-1" />
                      ) : (
                        <FaRobot className="inline mr-1 text-yellow-400" />
                      )}{" "}
                      {msg.text}
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
                <button
                  type="button"
                  onClick={startListening}
                  className={`ml-2 p-2 rounded-lg shadow transition ${listening ? "bg-red-500" : "bg-green-500 hover:bg-green-600"} text-white`}
                  title="Voice Input"
                >
                  <FaMicrophone />
                </button>
                <button
                  type="submit"
                  className="ml-2 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
                  onClick={() => { if (!userActivatedRef.current) enableVoiceGesture(); }}
                  title="Send"
                >
                  <FaPaperPlane />
                </button>
              </form>

              {/* Suggestions */}
              <div className="px-4 py-2 bg-indigo-100 border-t border-indigo-200 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    className="bg-indigo-200 hover:bg-indigo-300 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold transition shadow"
                    onClick={() => { if (!userActivatedRef.current) enableVoiceGesture(); handleSend(undefined, s); }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Resources */}
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
}
