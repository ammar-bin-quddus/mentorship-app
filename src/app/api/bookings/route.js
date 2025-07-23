import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { mentorId, timeSlot } = await req.json();

  await connectDB();
  const booking = await Booking.create({
    mentorId,
    menteeId: session.user.id,
    timeSlot,
    status: "booked",
  });

  return Response.json({ message: "Session booked successfully!", booking });
}
