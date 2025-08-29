import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
      if (onLoginSuccess) onLoginSuccess(form.username);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto bg-white/10 rounded-xl p-8 shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-2"><FaUser className="text-indigo-400" /> Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaUser /> Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Enter username" />
        </div>
        <div className="flex flex-col">
          <label className="text-indigo-100 font-semibold flex items-center gap-2"><FaLock /> Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="rounded-lg px-4 py-2 mt-1 bg-white/80 text-indigo-900" placeholder="Enter password" />
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition flex items-center justify-center" disabled={loading}>
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
          ) : "Login"}
        </button>
        {success && <div className="mt-4 p-4 rounded-lg bg-green-200 text-green-800 font-semibold">Login successful!</div>}
        {error && <div className="mt-4 p-4 rounded-lg bg-red-200 text-red-800 font-semibold">{error}</div>}
      </form>
    </section>
  );
};

export default Login; 