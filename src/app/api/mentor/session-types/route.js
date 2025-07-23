import { connectDB } from "@/lib/db";
import SessionType from "@/models/SessionType";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "mentor") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { title, description, price } = await req.json();
  await connectDB();

  const sessionType = await SessionType.create({
    mentorId: session.user.id,
    title,
    description,
    price,
  });

  return new Response(JSON.stringify(sessionType), { status: 201 });
}
