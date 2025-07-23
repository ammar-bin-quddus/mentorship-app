import { connectDB } from "@/lib/db";
import RescheduleProposal from "@/models/RescheduleProposal";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "mentor") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { bookingId, options } = await req.json();

  await connectDB();

  const booking = await Booking.findById(bookingId);
  if (!booking || booking.mentorId.toString() !== session.user.id) {
    return new Response(JSON.stringify({ message: "Booking not found or access denied" }), {
      status: 404,
    });
  }

  // Mark booking as reschedule pending
  booking.status = "reschedule_pending";
  await booking.save();

  const proposal = await RescheduleProposal.create({
    bookingId,
    proposedBy: session.user.id,
    options,
  });

  return new Response(JSON.stringify(proposal), { status: 201 });
}
