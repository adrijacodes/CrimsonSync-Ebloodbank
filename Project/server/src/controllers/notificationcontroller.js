// controllers/notificationController.js
import AsyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// get all user notifications
export const getUserNotifications = AsyncHandler(async (req, res) => {
  const userId = req.user._id; 

  const notifications = await Notification.find({ user: userId })
    .sort({ createdAt: -1 }); 
  if (!notifications) {
    throw new ApiError(404, "No notifications found for this user");
  }

  return res.status(200).json(new ApiResponse(notifications, "Notifications fetched successfully", true));
});

//search user notification based on status
export const searchUserNotifications = AsyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const [activeNotifications, seenNotifications] = await Promise.all([
      Notification.find({
        user: userId,
        isSeen: false,
        status: "active", 
      }).sort({ createdAt: -1 }),
  
      Notification.find({
        user: userId,
        isSeen: true,
        status: "seen", 
      }).sort({ createdAt: -1 }),
    ]);
  
    if (!activeNotifications.length && !seenNotifications.length) {
      throw new ApiError(404, "No notifications found for this user");
    }
  
    return res.status(200).json(
      new ApiResponse(
        {
          active: activeNotifications,
          seen: seenNotifications,
        },
        "Notifications fetched successfully",
        true
      )
    );
  });
  