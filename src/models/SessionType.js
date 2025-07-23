import mongoose from "mongoose";

const sessionTypeSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  description: String,
  price: Number,
});

export default mongoose.models.SessionType || mongoose.model("SessionType", sessionTypeSchema);
