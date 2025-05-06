import AsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import Notification from "../models/notificationsModel.js";
import ApiError from "../utils/ApiError.js";

// get all user notifications
export const getUserNotifications = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });

  if (!notifications || notifications.length === 0) {
    throw new ApiError(404, "No notifications found for this user");
  }

  const count = await Notification.countDocuments({ user: userId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        { notifications, count },
        "Notifications fetched successfully",
        true
      )
    );
});

// search user notification based on status
export const searchUserNotifications = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const status = req.query.status?.toLowerCase();

  if (
    !status ||
    !["active", "seen", "rejected", "cancelled"].includes(status)
  ) {
    throw new ApiError(
      400,
      "Invalid or missing 'status' query parameter"
    );
  }

 // const isRead = status === "seen";

  const query = {
    user: userId,
    status,
  };

  const [notifications, count] = await Promise.all([
    Notification.find(query).sort({ createdAt: -1 }),
    Notification.countDocuments(query),
  ]);

  if (!notifications.length) {
    throw new ApiError(404, `No ${status} notifications found`);
  }

  return res.status(200).json(
    new ApiResponse(
      {
        status,
        count,
        notifications,
      },
      `Successfully fetched ${status} notifications`,
      true
    )
  );
});

export const updateMarkAsReadStatus = AsyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const { status } = req.body;
  console.log(notificationId);
  console.log(status);

  const validStatuses = ["seen", "rejected"];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid notification status");
  }

  const notification = await Notification.findById(notificationId);
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  notification.status = status;
  notification.isRead = true;

  await notification.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        notification,
        `Notification status updated to '${status}'`,
        true
      )
    );
});

// reject user notification
export const rejectRequestNotification = AsyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findById(notificationId);
  if (notification.status == "rejected")
    throw new ApiError(
      400,
      "Action failed: This notification has already been marked as rejected."
    );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  notification.status = "rejected";
  notification.isRead = true;
  await notification.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        notification,
        "Notification updated to 'rejected' status.",
        true
      )
    );
});
