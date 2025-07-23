import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sessionTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "SessionType", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "AvailabilitySlot" },
  start: Date,
  end: Date,
  status: { type: String, enum: ["booked", "completed", "cancelled", "reschedule_pending"], default: "booked" },
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
