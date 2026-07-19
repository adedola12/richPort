// client/src/pages/admin/AdminAuthPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Label } from "../../components/ui";

const AdminAuthPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const { signIn } = useAuth();
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
      const email = (form.email || "").trim().toLowerCase();
      const password = form.password || "";

      await signIn({ email, password });

      setStatus({ type: "success", message: "Welcome back 👋" });
      navigate(redirectTo, { replace: true });
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
          <h1 className="text-2xl font-semibold mb-2">Admin Sign In</h1>
          <p className="text-sm text-neutral-300 mb-6">
            This area is for managing projects, journey, rates and customers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={status.type === "loading"}
              variant="primary"
              size="md"
              className="w-full mt-2"
            >
              {status.type === "loading" ? "Please wait..." : "Sign In"}
            </Button>
          </form>

          {status.type !== "idle" && (
            <p
              className={`mt-3 text-xs ${
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

        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage;
