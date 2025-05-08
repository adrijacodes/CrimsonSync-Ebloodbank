import mongoose from "mongoose";


const bloodRequestSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    city: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    day: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "fulfilled", "cancelled"],
      default: "pending",
    },
    eligibilityForm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EligibilityForm",
      required: false, // Optional at first, as form will be filled later
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodRequest", bloodRequestSchema);
