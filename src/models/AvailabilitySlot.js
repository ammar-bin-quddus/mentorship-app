import mongoose from "mongoose";

const availabilitySlotSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  start: Date,
  end: Date,
  isRecurring: Boolean,
  weekday: Number, // 0=Sunday, 1=Monday, etc (for recurring)
});

export default mongoose.models.AvailabilitySlot ||
  mongoose.model("AvailabilitySlot", availabilitySlotSchema);
