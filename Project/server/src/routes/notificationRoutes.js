// routes/notificationRoutes.js
import express from "express";
import { getUserNotifications } from "../controllers/notificationcontroller.js";
import { userRolecheck } from "../middlewares/userRoleChecking.js";
import verifyUserToken1 from "../middlewares/userAuth.middlewares.js";
const router = express.Router();

// Route to fetch notifications for a specific user
router.get(
  "/user-notifications",
  verifyUserToken1,
  userRolecheck,
  getUserNotifications
);

export default router;
