import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import AsyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";

export const registerAdmin = AsyncHandler(async (req, res) => {
  const { adminName, email, password } = req.body;

 
  if (!email || !password || !adminName) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError(409, "Admin with this email already exists.");
  }
  //const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    adminName: adminName?.toLowerCase(),
    email,
    password
  });

  const createdAdmin = await Admin.findById(admin._id).select("-password -__v -createdAt -updatedAt");
  if (!createdAdmin) {
    throw new ApiError(500, "Error registering the admin.");
  }

  const token = await admin.generateUserAccessToken();
  if (!token) {
    throw new ApiError(500, "Error generating access token.");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        { AdminInfo: createdAdmin, accessToken: token },
        "Admin registered successfully.",
        true
      )
    );
});
// Admin Login
export const loginAdmin = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // checking for insufficient data
  if (!email || !password) throw ApiError(400, "All fields required!");

  const user = await Admin.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid login credentials!User does not exist");
  }
 


  // checking password
  const isPasswordValid = await user.passwordValidityCheck(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid login credentials! Password incorrect.");
  }


  // generating access token

  const token = await user.generateUserAccessToken();
  if (!token) throw new ApiError(400, "Error while generating token!");

  // returning the data

  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse._id;
  delete userResponse.__v;
  delete userResponse.createdAt;
  delete userResponse.updatedAt;

  return res
    .status(201)
    .json(
      new ApiResponse(
        { UserInfo: userResponse, accessToken: token },
        "User login successful.",
        true
      )
    );
});

// Admin Logout
 export const adminLogout = AsyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
      new ApiResponse(
        {  },
        "User logged out.",
        true
      )
    );
  });