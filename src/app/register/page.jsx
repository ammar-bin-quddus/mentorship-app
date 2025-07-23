"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.message || "Something went wrong");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-2 border rounded"
        />
        <select {...register("role")} className="w-full p-2 border rounded">
          <option value="">Select Role</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 underline">
          Login
        </a>
      </p>
    </div>
  );
}
