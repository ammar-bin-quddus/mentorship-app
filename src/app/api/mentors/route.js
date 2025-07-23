import Mentor from "@/models/Mentor";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  await connectDB();
  const mentors = await Mentor.find({}, "-password"); // Exclude sensitive data
  return Response.json(mentors);
}
