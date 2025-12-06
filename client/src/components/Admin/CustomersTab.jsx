// src/components/admin/CustomersTab.jsx
import React, { useEffect, useState } from "react";

const CUSTOMERS_API = import.meta.env.VITE_AUTH_ENDPOINT || "";

const CustomersTab = () => {
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    const fetchData = async () => {
      setStatus({ type: "loading", message: "Loading customers..." });

      try {
        if (!`${CUSTOMERS_API}/api/rates/enquiries`) {
          // placeholder data
          setCustomers([
            {
              id: "demo-1",
              fullName: "Jane Doe",
              email: "jane@example.com",
              services: ["Brand Identity", "Website"],
              budget: 3000,
              message: "Excited to work with you!",
              submittedAt: new Date().toISOString(),
            },
          ]);
          setStatus({
            type: "success",
            message:
              "Showing demo customers. Once CUSTOMERS_API is set, real data will appear here.",
          });
          return;
        }

        const res = await fetch(`${CUSTOMERS_API}/api/rates/enquiries`);
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data);
        setStatus({ type: "success", message: "" });
      } catch (err) {
        console.error(err);
        setStatus({
          type: "error",
          message: "Unable to load customers. Please try again later.",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-['Mont']">
        Rate Form Submissions
      </h2>
      <p className="text-sm text-neutral-300 font-['Lexend'] max-w-2xl">
        Every time someone submits the rate form, their details appear here so
        you can follow up.
      </p>

      {status.type !== "idle" && status.message && (
        <p
          className={`text-xs font-['Mont'] ${
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

      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/40">
        <table className="min-w-full text-left text-xs font-['Lexend']">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 font-semibold text-neutral-200">Name</th>
              <th className="px-4 py-3 font-semibold text-neutral-200">
                Email
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-200">
                Services
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-200">
                Budget
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-200">
                Message
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-200">Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3">{c.fullName}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">
                  {Array.isArray(c.services)
                    ? c.services.join(", ")
                    : c.services}
                </td>
                <td className="px-4 py-3">
                  {c.budget ? `$${Number(c.budget).toLocaleString()}` : "-"}
                </td>
                <td className="px-4 py-3 max-w-xs truncate">{c.message}</td>
                <td className="px-4 py-3">
                  {c.submittedAt
                    ? new Date(c.submittedAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-neutral-400"
                >
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTab;
