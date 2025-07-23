"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function CreateSlotPage() {
  const { register, handleSubmit, watch } = useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const isRecurring = watch("isRecurring");

  const onSubmit = async (data) => {
    const payload = {
      start: data.start,
      end: data.end,
      isRecurring: data.isRecurring === "true",
      weekday: data.weekday ? parseInt(data.weekday) : null,
    };

    const res = await fetch("/api/mentor/slots", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.ok) alert("Slot created!");
    else alert("Failed to create slot.");
  };

  if (!session || session.user.role !== "mentor") {
    router.push("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create Availability Slot</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="datetime-local" {...register("start")} className="w-full border p-2 rounded" />
          <input type="datetime-local" {...register("end")} className="w-full border p-2 rounded" />
          <select {...register("isRecurring")} className="w-full border p-2 rounded">
            <option value="false">One-time</option>
            <option value="true">Recurring Weekly</option>
          </select>

          {isRecurring === "true" && (
            <select {...register("weekday")} className="w-full border p-2 rounded">
              <option value="">Select Weekday</option>
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          )}

          <button className="w-full bg-blue-600 text-white py-2 rounded">Create Slot</button>
        </form>
      </div>
    </>
  );
}
