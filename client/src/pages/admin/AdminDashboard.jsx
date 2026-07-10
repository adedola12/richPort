// client/src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

import ProjectsTab from "../../components/Admin/ProjectsTab.jsx";
import JourneyTab from "../../components/Admin/JourneyTab.jsx";
import RatesTab from "../../components/Admin/RatesTab.jsx";
import CustomersTab from "../../components/Admin/CustomersTab.jsx";
import TestimonialsTab from "../../components/Admin/TestimonialsTab.jsx";
import FaqTab from "../../components/Admin/FaqTab.jsx";
import DiscountsTab from "../../components/Admin/DiscountsTab.jsx";

const tabs = [
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "rates", label: "Rates" },
  { id: "discounts", label: "Discounts" },
  { id: "customers", label: "Customers" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-lime-300 font-semibold">
              Admin
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-semibold">
              Studio Control Panel
            </h1>
            <p className="mt-2 text-sm text-neutral-300 max-w-xl">
              Manage projects, your journey timeline, rate packages and customer
              enquiries in one place.
            </p>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-neutral-200">
                Logged in as <span className="font-semibold">{user.email}</span>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={logout}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full border border-red-400/70
                  bg-red-500/10 text-red-300
                  shadow-[0_0_20px_rgba(248,113,113,0.35)]
                  hover:bg-red-500/25 transition-colors
                "
                title="Sign out"
              >
                <FiLogOut className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>

        <div className="mb-8 inline-flex rounded-xl border border-white/15 bg-black/50 p-1 text-xs">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  active
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111318] px-6 py-7 sm:px-8 sm:py-8 shadow-[0_24px_100px_rgba(0,0,0,0.9)]">
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "journey" && <JourneyTab />}
          {activeTab === "rates" && <RatesTab />}
          {activeTab === "discounts" && <DiscountsTab />}
          {activeTab === "customers" && <CustomersTab />}
          {activeTab === "testimonials" && <TestimonialsTab />}
          {activeTab === "faq" && <FaqTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
