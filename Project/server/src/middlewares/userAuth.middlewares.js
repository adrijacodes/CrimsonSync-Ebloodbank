import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { TOKENSECRETKEY } from "../../envAccess.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";


const verifyUserToken1 = AsyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, TOKENSECRETKEY);
    // console.log(decodedToken);
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Invalid  user access token or token expired"
    );
  }

  const user = await User.findOne({ email: decodedToken.email });
  //console.log(user);

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  } 
  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse._id;
  delete userResponse.createdAt;
  delete userResponse.updatedAt;
  delete userResponse.__v;

  req.user = userResponse;
  next();
});

export default verifyUserToken1;
