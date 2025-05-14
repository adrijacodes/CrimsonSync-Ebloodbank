import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";

const cancelExpiredRequests = () => {
  cron.schedule("0 * * * *", async () => {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    const expiredRequests = await BloodRequest.find({
      status: "pending",
      createdAt: { $lte: twelveHoursAgo },
    });
    
    for (const request of expiredRequests) {
      request.status = "cancelled";
      await request.save();

      // Notify the recipient
      await Notification.create({
        user: request.recipient,
        bloodRequestId: request._id,
        message:
          "No donors responded within 12 hours. Your request has been automatically cancelled. We're sorry!",
        status: "active",
        isRead: false,
        type: "info",
      });

      // Cancel all related notifications
      await Notification.updateMany(
        { bloodRequestId: request._id },
        { $set: { status: "cancelled" } }
      );
    }

    console.log(
      `[CRON] Expired blood requests cancelled at ${new Date().toLocaleString()}`
    );
  });
};
export const checkAndCancelExpiredRequests = async () => {
  // for production
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
  // For testing purpose
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  const expiredRequests = await BloodRequest.find({
    status: "pending",
    createdAt: { $lte: twelveHoursAgo },
  });

  for (const request of expiredRequests) {
    console.log(request);

    request.status = "cancelled";
    await request.save();

    await Notification.create({
      user: request.recipient,
      bloodRequestId: request._id,
      message:
        "No donors responded within 12 hours. Your request has been automatically cancelled. We're sorry!",
      status: "active",
      isRead: false,
      type: "info",
    });

    await Notification.updateMany(
      { bloodRequestId: request._id },
      { $set: { status: "cancelled" } }
    );
  }

  console.log(
    `[INIT] Expired blood requests cancelled at ${new Date().toLocaleString()}`
  );
};

export default cancelExpiredRequests;
