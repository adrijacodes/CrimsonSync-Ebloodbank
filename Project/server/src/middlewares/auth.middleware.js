import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { TOKENSECRETKEY } from "../../envAccess.js";
import ApiError from "../utils/ApiError.js";
import Admin from "../models/adminModel.js";

const verifyUserToken = AsyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
  const updatedToken = token.substring(1, token.length - 1);

  console.log("Token received:", token);

  if (!token && !updatedToken) {
    throw new ApiError(401, "Unauthorized request is");
  }

  let decodedToken;
  try {
    if (token != updatedToken) {
      decodedToken = jwt.verify(updatedToken, TOKENSECRETKEY);
    } else decodedToken = jwt.verify(token, TOKENSECRETKEY);
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Invalid user access token or token expired"
    );
  }

  // Find the user in the Admin model using the email from the decoded token
  const user = await Admin.findOne({ email: decodedToken.email }).lean(); // Use .lean() for performance
  console.log(user);

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  const userResponse = user;
  delete userResponse.password;
  delete userResponse._id;
  delete userResponse.createdAt;
  delete userResponse.updatedAt;
  delete userResponse.__v;

  // Attach the user object to the request for further use
  req.user = userResponse;
  next();
});

export default verifyUserToken;
