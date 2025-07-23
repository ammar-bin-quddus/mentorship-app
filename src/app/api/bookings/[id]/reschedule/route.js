import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { proposedTime } = await req.json();
  await connectDB();

  await Booking.findByIdAndUpdate(params.id, {
    status: "reschedule_requested",
    rescheduleProposal: { proposedTime, status: "pending" },
  });

  return Response.json({ message: "Reschedule request sent." });
}
