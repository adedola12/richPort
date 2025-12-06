// src/components/Rate/RateForm.jsx
import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const API_URL = import.meta.env.VITE_AUTH_ENDPOINT || "";

const RateForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    services: [],
    budget: 3000,
    message: "",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });

  const serviceOptions = [
    "Website Design",
    "Logo Design",
    "Brand Identity Design",
    "Event Branding",
    "Presentation Design",
    "Pitch Deck Design",
    "Publication Design",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    setForm((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your request..." });

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      services: form.services,
      budget: form.budget,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      if (!`${API_URL}/api/rates/enquiries`) {
        console.log("Rate form submission payload:", payload);
        await new Promise((res) => setTimeout(res, 700));
        setStatus({
          type: "success",
          message:
            "Form is ready. Once the backend endpoint is connected, submissions will be stored.",
        });
        return;
      }

      const res = await fetch(`${API_URL}/api/rates/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Thanks! Your request has been sent successfully.",
      });
      setForm({
        fullName: "",
        email: "",
        services: [],
        budget: 3000,
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          "Something went wrong. Please try again or contact us directly by email.",
      });
    }
  };

  // ⬇️ Cards now have horizontal margin so they don’t sit on the vertical lines
  const cardBase =
    "mx-4 sm:mx-8 rounded-[14px] bg-[#111318] border border-white/5 " +
    "shadow-[0_24px_80px_rgba(0,0,0,0.9)] px-6 py-6 sm:px-8 sm:py-7 " +
    "transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_30px_100px_rgba(0,0,0,1)]";

  const underlineWrapper =
    "mt-3 border-b border-[#242424] pb-2 transition-colors duration-150 focus-within:border-lime-400";

  const underlineInput =
    "w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none";

  return (
    <section
      id="rate-form"
      className="relative w-full bg-[#050505] pb-16 pt-10 lg:pb-20 lg:pt-14"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4">
        {/* single central column with faint vertical borders */}
        <div className="border-x border-[#242424] px-0 pb-4 pt-4 sm:px-4">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            {/* Row 1: Full Name / Email */}
            <div className={cardBase}>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-white font-['Mont']"
                  >
                    Full Name
                  </label>
                  <div className={underlineWrapper}>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Type here"
                      required
                      className={underlineInput}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white font-['Mont']"
                  >
                    Email
                  </label>
                  <div className={underlineWrapper}>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Type here"
                      required
                      className={underlineInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Why are you contacting us? */}
            <div className={cardBase}>
              <p className="mb-5 text-base font-semibold text-white font-['Mont']">
                Why are you contacting us?
              </p>

              <div className="grid gap-y-4 gap-x-10 sm:grid-cols-2">
                {serviceOptions.map((service) => {
                  const checked = form.services.includes(service);
                  return (
                    <label
                      key={service}
                      className="group flex cursor-pointer items-center gap-3 text-sm text-neutral-200 font-['Mont']"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleService(service)}
                        className="peer sr-only"
                      />
                      <span
                        className="
                          flex h-7 w-7 items-center justify-center
                          rounded-md border border-[#2b2c30] bg-[#141518]
                          shadow-[0_0_0_1px_rgba(0,0,0,0.75)]
                          transition-all duration-150
                          group-hover:border-lime-300
                          peer-checked:border-lime-400
                          peer-checked:shadow-[0_0_14px_rgba(190,242,100,0.7)]
                        "
                      >
                        <FiCheck
                          className="
                            h-4 w-4 text-lime-400
                            opacity-0 transition-opacity duration-150
                            peer-checked:opacity-100
                          "
                        />
                      </span>
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Budget slider */}
            <div className={cardBase}>
              <p className="mb-1 text-base font-semibold text-white font-['Mont']">
                Your Budget
              </p>
              <p className="mb-6 text-xs sm:text-sm text-neutral-300 font-['Mont']">
                Slide to indicate your budget range
              </p>

              <div className="mb-5 flex flex-col gap-4">
                <input
                  type="range"
                  name="budget"
                  min={1000}
                  max={5000}
                  step={250}
                  value={form.budget}
                  onChange={handleChange}
                  className="
                    w-full accent-lime-500
                    [&::-webkit-slider-runnable-track]:h-[3px]
                    [&::-webkit-slider-runnable-track]:bg-[#242424]
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-lime-500
                    [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(190,242,100,0.8)]
                    [&::-webkit-slider-thumb]:mt-[-6px]
                    [&::-moz-range-track]:h-[3px]
                    [&::-moz-range-track]:bg-[#242424]
                    [&::-moz-range-thumb]:h-5
                    [&::-moz-range-thumb]:w-5
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-lime-500
                    [&::-moz-range-thumb]:border-none
                    [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(190,242,100,0.8)]
                  "
                />
              </div>

              <div className="flex items-center justify-between text-xs font-['Mont'] text-neutral-400">
                <span>$1000</span>
                <span className="text-neutral-200">
                  ${Number(form.budget).toLocaleString()}
                </span>
                <span>$5000</span>
              </div>
            </div>

            {/* Row 4: Message */}
            <div className={cardBase}>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-white font-['Mont']"
              >
                Your Message
              </label>
              <div className={`${underlineWrapper} mt-4`}>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type here"
                  rows={4}
                  className={`${underlineInput} resize-none`}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="
                  inline-flex min-w-[160px] items-center justify-center
                  rounded-md
                  bg-gradient-to-b from-lime-400 to-lime-600
                  px-10 py-3
                  text-sm font-semibold text-black font-['Mont']
                  shadow-[0_18px_60px_rgba(132,204,22,0.7)]
                  transition-transform duration-200
                  hover:-translate-y-[1px] hover:brightness-110
                  disabled:cursor-not-allowed disabled:opacity-70
                "
              >
                {status.type === "loading" ? "Submitting..." : "Submit"}
              </button>
            </div>

            {status.type !== "idle" && (
              <p
                className={`text-center text-xs sm:text-sm font-['Mont'] ${
                  status.type === "success"
                    ? "text-lime-400"
                    : status.type === "error"
                    ? "text-red-400"
                    : "text-neutral-300"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RateForm;
