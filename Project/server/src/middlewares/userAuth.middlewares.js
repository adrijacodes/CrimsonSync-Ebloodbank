import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { TOKENSECRETKEY } from "../../envAccess.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";

const verifyUserToken1 = AsyncHandler(async (req, _, next) => {
  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  //console.log("Token received:", token);

  if (!token) {
    throw new ApiError(401, "Unauthorized request: No token provided");
  }

  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, TOKENSECRETKEY);
   // console.log("Decoded Token:", decodedToken);
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Invalid user access token or token expired"
    );
  }

  const user = await User.findOne({ email: decodedToken.email }).lean();
  //console.log("User found:", user);

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  const userResponse = { ...user };
  delete userResponse.password;
  delete userResponse.createdAt;
  delete userResponse.updatedAt;
  delete userResponse.__v;

  req.user = userResponse;
  next();
});

export default verifyUserToken1;
