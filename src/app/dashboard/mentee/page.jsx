"use client";

import { useEffect, useState } from "react";

export default function MenteeDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("/api/bookings/mentee");
      const data = await res.json();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirmed = confirm("Are you sure you want to cancel?");
    if (!confirmed) return;

    const res = await fetch(`/api/bookings/${id}/cancel`, { method: "PATCH" });
    const data = await res.json();
    alert(data.message);
    location.reload();
  };

  const handleReschedule = async (id) => {
    const newDate = prompt("Enter new date & time (e.g. 2025-08-01T14:00):");
    if (!newDate) return;

    const res = await fetch(`/api/bookings/${id}/reschedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposedTime: newDate }),
    });
    const data = await res.json();
    alert(data.message);
    location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Booked Sessions</h1>
      {bookings.map((b) => (
        <div
          key={b._id}
          className="border p-4 rounded mb-4 shadow bg-white space-y-2"
        >
          <p>
            <strong>Mentor:</strong> {b.mentorId?.name}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {new Date(b.timeSlot).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {b.status}
          </p>

          {b.rescheduleProposal?.status === "pending" && (
            <p className="text-yellow-600">
              Awaiting mentor’s response to your reschedule request.
            </p>
          )}

          <div className="flex gap-3 mt-2">
            {b.status === "booked" && (
              <>
                <button
                  onClick={() => handleReschedule(b._id)}
                  className="text-blue-600 underline"
                >
                  Request Reschedule
                </button>
                <button
                  onClick={() => handleCancel(b._id)}
                  className="text-red-600 underline"
                >
                  Cancel Session
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
