// app/api/bookings/mentee/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Mentor from "@/models/Mentor";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  await connectDB();
  const bookings = await Booking.find({ menteeId: session.user.id })
    .populate("mentorId", "name email topics");

  return Response.json(bookings);
}
