"use client";

import { useEffect, useState } from "react";

export default function MentorList() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const res = await fetch("/api/mentors");
      const data = await res.json();
      setMentors(data);
    };
    fetchMentors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{mentor.name}</h2>
            <p className="text-sm text-gray-600">{mentor.bio}</p>
            <p className="text-sm mt-2">
              <strong>Topics:</strong> {mentor.topics.join(", ")}
            </p>
            <a
              href={`/mentors/${mentor._id}`}
              className="inline-block mt-3 text-blue-600 underline"
            >
              View Profile & Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
