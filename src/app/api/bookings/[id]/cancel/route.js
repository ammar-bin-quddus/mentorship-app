import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  await connectDB();
  await Booking.findByIdAndUpdate(params.id, { status: "cancelled" });

  return Response.json({ message: "Booking cancelled." });
}
