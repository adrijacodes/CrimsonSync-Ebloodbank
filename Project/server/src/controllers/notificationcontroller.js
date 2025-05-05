
import AsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import Notification from "../models/notificationsModel.js";
import ApiError from "../utils/ApiError.js";

// get all user notifications
export const getUserNotifications = AsyncHandler(async (req, res) => {
    const userId = req.user._id; 
  
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 }); 
  
    if (!notifications || notifications.length === 0) {
      throw new ApiError(404, "No notifications found for this user");
    }
  
    const count = await Notification.countDocuments({ user: userId });
  
    return res.status(200).json(
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
  
    if (!status || !["active", "seen"].includes(status)) {
      throw new ApiError(400, "Invalid or missing 'status' query parameter (use 'active' or 'seen')");
    }
  
    
    const isRead = status === "seen";
  
  
    const query = {
      user: userId,
      status,
      isRead
    };
  
    const [notifications, count] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }),
      Notification.countDocuments(query)
    ]);
  
    if (!notifications.length) {
      throw new ApiError(404, `No ${status} notifications found`);
    }
  
    return res.status(200).json(
      new ApiResponse(
        {
          status,
          isRead,
          count,
          notifications
        },
        `Successfully fetched ${status} notifications`,
        true
      )
    );
  });
  
  


export const updateNotificationStatus = AsyncHandler(async (req, res) => {
  const { notificationId } = req.params; 
 
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new ApiError(404, "Notification not found ");
  }

  // Update the notification status to 'seen'
  notification.status = "seen";
  notification.isRead = true;

  // Save the updated notification
  await notification.save();

  return res.status(200).json(
    new ApiResponse(
      notification,
      "Notification status updated to 'seen'",
      true
    )
  );
});
