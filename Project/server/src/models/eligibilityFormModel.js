import mongoose from "mongoose";

const eligibilityFormSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    bloodRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodRequest",
      required: true,
    },
    healthStatus: {
      type: String,
      enum: ["Eligible", "Ineligible", "Pending","Cancelled"], 
      default: "Pending",
    },
    formData: {
      type: Map,
      of: String, // Store form responses as key-value pairs
    },
  },
  { timestamps: true }
);

export default mongoose.model("EligibilityForm", eligibilityFormSchema);
