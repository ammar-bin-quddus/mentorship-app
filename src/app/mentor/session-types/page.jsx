"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SessionTypesPage() {
  const { register, handleSubmit, reset } = useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await fetch("/api/mentor/session-types", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      alert("Session type added!");
    } else {
      alert("Error creating session type");
    }
  };

  if (!session || session.user.role !== "mentor") {
    router.push("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Create Session Type</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register("title")}
            placeholder="Session Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 border rounded"
          ></textarea>
          <input
            type="number"
            {...register("price")}
            placeholder="Price ($)"
            className="w-full p-2 border rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
