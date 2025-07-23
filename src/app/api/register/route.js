import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password || !role) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword, role });

  return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}

