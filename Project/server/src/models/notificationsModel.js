import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodRequest",
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "seen", "accepted", "rejected","cancelled"],
      default: "active",
    },
    type: {
      type: String,
      enum: ["info", "action_required"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
