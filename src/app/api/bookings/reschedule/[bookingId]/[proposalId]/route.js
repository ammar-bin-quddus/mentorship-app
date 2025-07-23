import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { bookingId, proposalId } = params;
  const { action } = await req.json(); // action = "accept" or "decline"

  if (!["accept", "decline"].includes(action)) {
    return new Response("Invalid action", { status: 400 });
  }

  await connectDB();

  const booking = await Booking.findById(bookingId);

  if (!booking) return new Response("Booking not found", { status: 404 });

  const isParticipant =
    booking.mentorId.toString() === session.user.id ||
    booking.menteeId.toString() === session.user.id;

  if (!isParticipant) {
    return new Response("Forbidden", { status: 403 });
  }

  const proposal = booking.rescheduleProposals.id(proposalId);
  if (!proposal || proposal.status !== "pending") {
    return new Response("Proposal not found or already resolved", { status: 400 });
  }

  if (action === "accept") {
    // Update the selected proposal to accepted
    proposal.status = "accepted";

    // Reject all others
    booking.rescheduleProposals.forEach((p) => {
      if (p._id.toString() !== proposalId) {
        p.status = "declined";
      }
    });

    // Update session time
    booking.timeSlot = proposal.newTimeSlot;
    booking.status = "booked"; // back to normal
  } else if (action === "decline") {
    proposal.status = "declined";

    // If no pending proposals left, reset booking status
    const pending = booking.rescheduleProposals.some((p) => p.status === "pending");
    if (!pending) {
      booking.status = "booked";
    }
  }

  await booking.save();
  return new Response(JSON.stringify({ message: `Proposal ${action}ed successfully.` }), {
    status: 200,
  });
}
