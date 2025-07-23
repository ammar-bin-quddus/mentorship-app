import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import AvailabilitySlot from "@/models/AvailabilitySlot";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "mentor") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { start, end, isRecurring, weekday } = await req.json();

  await connectDB();

  const slot = await AvailabilitySlot.create({
    mentorId: session.user.id,
    start: new Date(start),
    end: new Date(end),
    isRecurring,
    weekday: isRecurring ? weekday : null,
  });

  return new Response(JSON.stringify(slot), { status: 201 });
}
