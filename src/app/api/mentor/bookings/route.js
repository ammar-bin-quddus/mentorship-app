import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "mentor") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  await connectDB();

  const bookings = await Booking.find({ mentorId: session.user.id })
    .populate("menteeId", "name email")
    .populate("sessionTypeId", "title")
    .sort({ start: 1 });

  return new Response(JSON.stringify(bookings), { status: 200 });
}
