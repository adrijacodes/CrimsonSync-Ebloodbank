import AsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";

export const userRolecheck = AsyncHandler(async (req, _, next) => {
  if (req.user.role !== "member") {
    throw new ApiError(403, "Unauthorized user");
  }

  next();
});
export const adminRolecheck = AsyncHandler(async (req, _, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Unauthorized user");
  }
  next();
});
