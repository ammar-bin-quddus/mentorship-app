import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(_, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  await connectDB();

  try {
    const booking = await Booking.findById(params.id)
      .populate("mentorId", "name email")
      .populate("menteeId", "name email")
      .populate("sessionTypeId", "title price");

    if (
      booking.mentorId._id.toString() !== session.user.id &&
      booking.menteeId._id.toString() !== session.user.id
    ) {
      return new Response("Forbidden", { status: 403 });
    }

    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    return new Response("Not Found", { status: 404 });
  }
}
