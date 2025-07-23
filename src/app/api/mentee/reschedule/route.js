import { connectDB } from "@/lib/db";
import RescheduleProposal from "@/models/RescheduleProposal";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "mentee") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { proposalId, acceptedIndex } = await req.json();
  await connectDB();

  const proposal = await RescheduleProposal.findById(proposalId).populate("bookingId");
  if (!proposal || proposal.bookingId.menteeId.toString() !== session.user.id) {
    return new Response(JSON.stringify({ message: "Proposal not found or access denied" }), {
      status: 404,
    });
  }

  const booking = proposal.bookingId;

  if (acceptedIndex !== null && proposal.options[acceptedIndex]) {
    // Accept a proposed time
    booking.start = proposal.options[acceptedIndex].start;
    booking.end = proposal.options[acceptedIndex].end;
    booking.status = "booked";

    proposal.status = "accepted";
    proposal.acceptedOptionIndex = acceptedIndex;
  } else {
    // Decline all proposals
    proposal.status = "declined";
    booking.status = "cancelled"; // fallback behavior
  }

  await booking.save();
  await proposal.save();

  return new Response(JSON.stringify({ message: "Updated" }), { status: 200 });
}
