// // import React, { useState } from "react";
// // import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// // const TEXT = {
// //   en: {
// //     title: "Register",
// //     username: "Username",
// //     email: "Email",
// //     password: "Password",
// //     usernamePlaceholder: "Enter username",
// //     emailPlaceholder: "Enter email",
// //     passwordPlaceholder: "Enter password",
// //     button: "Register",
// //     success: "Registration successful!",
// //     error: "Registration failed. Please try again.",
// //   },
// //   hi: {
// //     title: "रजिस्टर करें",
// //     username: "यूज़रनेम",
// //     email: "ईमेल",
// //     password: "पासवर्ड",
// //     usernamePlaceholder: "यूज़रनेम दर्ज करें",
// //     emailPlaceholder: "ईमेल दर्ज करें",
// //     passwordPlaceholder: "पासवर्ड दर्ज करें",
// //     button: "रजिस्टर करें",
// //     success: "पंजीकरण सफल!",
// //     error: "पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।",
// //   },
// //   bn: {
// //     title: "রেজিস্টার করুন",
// //     username: "ইউজারনেম",
// //     email: "ইমেইল",
// //     password: "পাসওয়ার্ড",
// //     usernamePlaceholder: "ইউজারনেম লিখুন",
// //     emailPlaceholder: "ইমেইল লিখুন",
// //     passwordPlaceholder: "পাসওয়ার্ড লিখুন",
// //     button: "রেজিস্টার করুন",
// //     success: "রেজিস্ট্রেশন সফল!",
// //     error: "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
// //   }
// // };

// // const Register = ({ onRegistered, language = "en" }) => {
// //   const [form, setForm] = useState({ username: "", email: "", password: "" });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);
// //     setSuccess(false);
// //     try {
// //       // Simulate API call
// //       await new Promise((res) => setTimeout(res, 1200));
// //       setSuccess(true);
// //       if (onRegistered) onRegistered();
// //     } catch (err) {
// //       setError(TEXT[language].error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="w-full max-w-md mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
// //       <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2">
// //         <FaUser className="text-indigo-400" /> {TEXT[language].title}
// //       </h2>
// //       <form onSubmit={handleSubmit} className="space-y-4 text-left">
// //         <div className="flex flex-col">
// //           <label className="text-indigo-100 font-semibold flex items-center gap-2">
// //             <FaUser /> {TEXT[language].username}
// //           </label>
// //           <input
// //             type="text"
// //             name="username"
// //             value={form.username}
// //             onChange={handleChange}
// //             required
// //             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //             placeholder={TEXT[language].usernamePlaceholder}
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-indigo-100 font-semibold flex items-center gap-2">
// //             <FaEnvelope /> {TEXT[language].email}
// //           </label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={form.email}
// //             onChange={handleChange}
// //             required
// //             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
// //             placeholder={TEXT[language].emailPlaceholder}
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-indigo-100 font-semibold flex items-center gap-2">
// //             <FaLock /> {TEXT[language].password}
// //           </label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={form.password}
// //             onChange={handleChange}
// //             required
// //             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
// //             placeholder={TEXT[language].passwordPlaceholder}
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center"
// //           disabled={loading}
// //         >
// //           {loading ? (
// //             <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
// //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
// //             </svg>
// //           ) : TEXT[language].button}
// //         </button>
// //         {success && (
// //           <div className="mt-4 p-4 rounded-lg bg-green-200 text-green-800 font-semibold">
// //             {TEXT[language].success}
// //           </div>
// //         )}
// //         {error && (
// //           <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">
// //             {error}
// //           </div>
// //         )}
// //       </form>
// //     </section>
// //   );
// // };

// // export default Register;
// import React, { useState } from "react";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// const TEXT = {
//   en: {
//     title: "Register",
//     username: "Username",
//     email: "Email",
//     password: "Password",
//     usernamePlaceholder: "Enter username",
//     emailPlaceholder: "Enter email",
//     passwordPlaceholder: "Enter password",
//     button: "Register",
//     success: "Registration successful!",
//     error: "Registration failed. Please try again.",
//   },
//   hi: {
//     title: "रजिस्टर करें",
//     username: "यूज़रनेम",
//     email: "ईमेल",
//     password: "पासवर्ड",
//     usernamePlaceholder: "यूज़रनेम दर्ज करें",
//     emailPlaceholder: "ईमेल दर्ज करें",
//     passwordPlaceholder: "पासवर्ड दर्ज करें",
//     button: "रजिस्टर करें",
//     success: "पंजीकरण सफल!",
//     error: "पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।",
//   },
//   bn: {
//     title: "রেজিস্টার করুন",
//     username: "ইউজারনেম",
//     email: "ইমেইল",
//     password: "পাসওয়ার্ড",
//     usernamePlaceholder: "ইউজারনেম লিখুন",
//     emailPlaceholder: "ইমেইল লিখুন",
//     passwordPlaceholder: "পাসওয়ার্ড লিখুন",
//     button: "রেজিস্টার করুন",
//     success: "রেজিস্ট্রেশন সফল!",
//     error: "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
//   }
// };

// const Register = ({ onRegistered, language = "en" }) => {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);
//     try {
//       // Simulate API call
//       await new Promise((res) => setTimeout(res, 1200));
//       setSuccess(true);
//       if (onRegistered) onRegistered();
//     } catch (err) {
//       setError(TEXT[language].error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full max-w-md mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
//       <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2">
//         <FaUser className="text-indigo-400" /> {TEXT[language].title}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4 text-left">
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaUser /> {TEXT[language].username}
//           </label>
//           <input
//             type="text"
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             required
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             placeholder={TEXT[language].usernamePlaceholder}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaEnvelope /> {TEXT[language].email}
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
//             placeholder={TEXT[language].emailPlaceholder}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-indigo-100 font-semibold flex items-center gap-2">
//             <FaLock /> {TEXT[language].password}
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
//             placeholder={TEXT[language].passwordPlaceholder}
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center"
//           disabled={loading}
//         >
//           {loading ? (
//             <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//             </svg>
//           ) : TEXT[language].button}
//         </button>
//         {success && (
//           <div className="mt-4 p-4 rounded-lg bg-green-200 text-green-800 font-semibold">
//             {TEXT[language].success}
//           </div>
//         )}
//         {error && (
//           <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">
//             {error}
//           </div>
//         )}
//       </form>
//     </section>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const TEXT = {
  en: {
    title: "Register",
    username: "Username",
    email: "Email",
    password: "Password",
    usernamePlaceholder: "Enter username",
    emailPlaceholder: "Enter email",
    passwordPlaceholder: "Enter password",
    button: "Register",
    success: "Registration successful!",
    error: "Registration failed. Please try again.",
  },
  hi: {
    title: "रजिस्टर करें",
    username: "यूज़रनेम",
    email: "ईमेल",
    password: "पासवर्ड",
    usernamePlaceholder: "यूज़रनेम दर्ज करें",
    emailPlaceholder: "ईमेल दर्ज करें",
    passwordPlaceholder: "पासवर्ड दर्ज करें",
    button: "रजिस्टर करें",
    success: "पंजीकरण सफल!",
    error: "पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।",
  },
  bn: {
    title: "রেজিস্টার করুন",
    username: "ইউজারনেম",
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    usernamePlaceholder: "ইউজারনেম লিখুন",
    emailPlaceholder: "ইমেইল লিখুন",
    passwordPlaceholder: "পাসওয়ার্ড লিখুন",
    button: "রেজিস্টার করুন",
    success: "রেজিস্ট্রেশন সফল!",
    error: "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
  },
};

const API_BASE = import.meta.env.VITE_API_URL || ""; // e.g. http://127.0.0.1:8000

export default function Register({ onRegistered, language = "en" }) {
  const T = TEXT[language] || TEXT.en;

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Backend model accepts username + password (email optional)
    const payload = {
      username: form.username.trim(),
      password: form.password,
      email: form.email.trim() || undefined,
    };

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.detail || data?.message || `${T.error} (HTTP ${res.status})`;
        setError(String(msg));
        return;
      }

      setSuccess(true);
      // store username so Predict page can reuse the same one
      localStorage.setItem("stroketron_username", payload.username);

      if (onRegistered) onRegistered(data);
    } catch (err) {
      setError(err?.message || T.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2">
        <FaUser className="text-indigo-400" /> {T.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Username */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaUser /> {T.username}
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder={T.usernamePlaceholder}
            autoComplete="username"
          />
        </div>

        {/* Email (optional for backend, still shown in UI) */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaEnvelope /> {T.email}
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
            placeholder={T.emailPlaceholder}
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2">
            <FaLock /> {T.password}
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900"
            placeholder={T.passwordPlaceholder}
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : T.button}
        </button>

        {success && (
          <div className="mt-4 p-4 rounded-lg bg-green-200 text-green-800 font-semibold">
            {T.success}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">
            {error}
          </div>
        )}
      </form>
    </section>
  );
}
