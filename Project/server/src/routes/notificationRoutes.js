// routes/notificationRoutes.js
import express from "express";
import { getUserNotifications, searchUserNotifications, updateNotificationStatus } from "../controllers/notificationcontroller.js";
import { userRolecheck } from "../middlewares/userRoleChecking.js";
import verifyUserToken1 from "../middlewares/userAuth.middlewares.js";

const router = express.Router();

// Route to fetch all notifications for a user
router.get(
  "/",
  verifyUserToken1,
  userRolecheck,
  getUserNotifications
);

// Route to search notifications for a user based on status (active or seen)
router.get(
  "/search",
  verifyUserToken1,
  userRolecheck,
  searchUserNotifications
);

// Route to update notification status from active to seen
router.patch(
  "/:notificationId",
  verifyUserToken1,
  userRolecheck,
  updateNotificationStatus
);

export default router;
