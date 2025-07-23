import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  await connectDB();

  try {
    const bookings = await Booking.find({
      $or: [
        { mentorId: session.user.id },
        { menteeId: session.user.id }
      ],
      status: { $in: ["reschedule_pending"] }
    })
    .populate("mentorId", "name email")
    .populate("menteeId", "name email")
    .populate("sessionTypeId", "title price")
    .sort({ updatedAt: -1 });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to fetch reschedules" }), { status: 500 });
  }
}
