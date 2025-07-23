"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function MentorBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("/api/mentor/bookings");
      const data = await res.json();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Your Upcoming Sessions</h2>
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 border rounded">
              <p><strong>Mentee:</strong> {booking.menteeId.name}</p>
              <p><strong>Session:</strong> {booking.sessionTypeId.title}</p>
              <p><strong>Time:</strong> {new Date(booking.start).toLocaleString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
