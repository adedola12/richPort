// src/pages/admin/AdminAuthPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminAuthPage = () => {
  const [mode, setMode] = useState("signin"); // or "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Authenticating..." });

    try {
      if (mode === "signin") {
        const data = await signIn({
          email: form.email,
          password: form.password,
        });
        console.log("Signin OK:", data);
      } else {
        const data = await signUp({
          name: form.name || form.email.split("@")[0],
          email: form.email,
          password: form.password,
        });
        console.log("Signup OK:", data);
      }

      setStatus({ type: "success", message: "Welcome back 👋" });

      // 🔥 Always go to admin dashboard after auth
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.message || "Unable to authenticate. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16 text-white">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-2xl border border-white/10 bg-[#111318] px-6 py-8 shadow-[0_24px_100px_rgba(0,0,0,0.9)]">
          <h1 className="text-2xl font-semibold font-['Mont'] mb-2">
            {mode === "signin" ? "Admin Sign In" : "Admin Sign Up"}
          </h1>
          <p className="text-sm text-neutral-300 mb-6 font-['Lexend']">
            This area is for managing projects, journey, rates and customers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold mb-1 font-['Mont']">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold mb-1 font-['Mont']">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 font-['Mont']">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={status.type === "loading"}
              className="
                mt-2 w-full rounded-md
                bg-gradient-to-b from-lime-400 to-lime-600
                py-2.5 text-sm font-semibold text-black font-['Mont']
                shadow-[0_18px_60px_rgba(132,204,22,0.7)]
                hover:brightness-110
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {status.type === "loading"
                ? "Please wait..."
                : mode === "signin"
                ? "Sign In"
                : "Create Admin Account"}
            </button>
          </form>

          {status.type !== "idle" && (
            <p
              className={`mt-3 text-xs font-['Mont'] ${
                status.type === "error"
                  ? "text-red-400"
                  : status.type === "success"
                  ? "text-lime-400"
                  : "text-neutral-300"
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="button"
            onClick={() =>
              setMode((prev) => (prev === "signin" ? "signup" : "signin"))
            }
            className="mt-4 w-full text-center text-xs text-neutral-300 hover:text-white font-['Lexend']"
          >
            {mode === "signin"
              ? "Need an account? Sign up as admin"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage;
