import express from "express";
import ApiError from "./utils/ApiError.js";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "../src/routes/authRoute.js";
import searchBloodRoutes from "../src/routes/bloodRequestSearch.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminAuthRoutes.js";
import cancelExpiredRequests from "./crons/cancelExpiredRequests.js";
import { checkAndCancelExpiredRequests } from "./crons/cancelExpiredRequests.js";
import "./crons/bloodRequestScheduler.js";
import {
  pendingAcceptedBloodRequestCancellation,
  pendingFormsCancellation,
} from "./crons/pendingScheduler.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth/user", authRoutes);
app.use("/api/blood-requests", searchBloodRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth/admin", adminRoutes);

// for any undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
cancelExpiredRequests();
checkAndCancelExpiredRequests();
pendingAcceptedBloodRequestCancellation();
pendingFormsCancellation();

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    status: 500,
    message: "Internal Server Error",
  });
});

export { app };
