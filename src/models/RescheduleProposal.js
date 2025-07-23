import mongoose from "mongoose";

const rescheduleProposalSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  proposedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  options: [
    {
      start: Date,
      end: Date,
    },
  ],
  acceptedOptionIndex: { type: Number, default: null }, // null = not accepted
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});

export default mongoose.models.RescheduleProposal ||
  mongoose.model("RescheduleProposal", rescheduleProposalSchema);
