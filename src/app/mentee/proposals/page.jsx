"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProposalsPage() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const res = await fetch("/api/mentee/proposals"); // You’ll need to build this API
      const data = await res.json();
      setProposals(data);
    };
    fetchProposals();
  }, []);

  const respond = async (proposalId, acceptedIndex) => {
    await fetch("/api/mentee/reschedule", {
      method: "POST",
      body: JSON.stringify({ proposalId, acceptedIndex }),
    });
    alert("Response submitted");
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Reschedule Requests</h2>
        {proposals.map((p) => (
          <div key={p._id} className="border p-4 rounded mb-4">
            <p>Booking: {p.bookingId._id}</p>
            <p>Status: {p.status}</p>
            <div className="space-y-2 mt-2">
              {p.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => respond(p._id, idx)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Accept Option {idx + 1} — {new Date(opt.start).toLocaleString()}
                </button>
              ))}
              <button
                onClick={() => respond(p._id, null)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Decline All
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
