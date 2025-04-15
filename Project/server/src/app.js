import express from "express";
import ApiError from "./utils/ApiError.js";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "../src/routes/authRoute.js";
// import searchDonorRouter from "../routes/searchDonorRoute.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminAuthRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/auth/user", authRoutes);
// app.use("/api/searchDonors", searchDonorRouter);
app.use("/api/events", eventRoutes);
app.use("/api/auth/admin", adminRoutes);

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
