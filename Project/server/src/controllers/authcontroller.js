// @ts-nocheck
import { generateUsername } from "../utils/usernamegenerate.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// User Registration

export const registerUser = AsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    throw new ApiError(400, "All fields are required.");
  }
  // checking if existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists.");
  }

//   const hashedPassword = await bcrypt.hash(password, 10);
  const username = generateUsername();

  const user = await User.create({
    name: name?.toLowerCase(),
    email,
    password,
    username: username,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -createdAt -updatedAt -__v -_id"
  );

  if (!createdUser) {
    throw new ApiError(500, "Error registering the admin.");
  }

  const token = await user.generateUserAccessToken();
  if (!token) {
    throw new ApiError(500, "Error generating access token.");
  }

  // returning response
  return res
    .status(201)
    .json(
      new ApiResponse(
        { UserInfo: createdUser, accessToken: token },
        "User registered successfully.",
        true
      )
    );
});

// User Login
export const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // checking for insufficient data
  if (!email || !password) throw ApiError(400, "All fields required!");

  const user = await User.findOne({ email });
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


// User Logout
 export const userLogout = AsyncHandler(async (req, res) => {
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