"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await fetch(`/api/mentors/${id}`);
      const data = await res.json();
      setMentor(data);
    };
    fetchMentor();
  }, [id]);

  const handleBooking = async (slot) => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId: mentor._id, timeSlot: slot }),
    });
    const data = await res.json();
    alert(data.message);
  };

  if (!mentor) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{mentor.name}</h1>
      <p className="text-gray-700">{mentor.bio}</p>
      <h2 className="mt-6 font-semibold">Available Slots:</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        {mentor.availability?.map((slot, idx) => (
          <button
            key={idx}
            className="border px-3 py-2 rounded hover:bg-blue-100"
            onClick={() => handleBooking(slot)}
          >
            {new Date(slot).toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}
