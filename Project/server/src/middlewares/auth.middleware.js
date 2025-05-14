import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { TOKENSECRETKEY } from "../../envAccess.js";
import ApiError from "../utils/ApiError.js";
import Admin from "../models/adminModel.js";

const verifyUserToken = AsyncHandler(async (req, _, next) => {
  let updatedToken;
  const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

  console.log("Token received:", token);


  if (token && token.substring(0, 1) === '"') {
    updatedToken = token.substring(1, token.length - 1);
  } else {
    updatedToken = token;
  }

  if (!updatedToken) {
    throw new ApiError(401, "Unauthorized request: No token provided");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(updatedToken, TOKENSECRETKEY);
    console.log("Decoded Token:", decodedToken);
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid user access token or token expired");
  }

  // Find the user in the Admin model using the decoded token's email
  const user = await Admin.findOne({ email: decodedToken.email }).lean(); // .lean() improves performance
  console.log("User found:", user);

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }


  const userResponse = { ...user };  
  delete userResponse.password;
  delete userResponse._id;
  delete userResponse.createdAt;
  delete userResponse.updatedAt;
  delete userResponse.__v;

 
  req.user = userResponse;
  next();  
});

export default verifyUserToken;
