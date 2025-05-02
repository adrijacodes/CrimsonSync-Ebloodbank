// @ts-nocheck
import mongoose from "mongoose";
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

  // Check if user already exists with the same email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists.");
  }

  // Generate username
  const username = generateUsername();

  try {
    // Attempt to create a new user
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
      throw new ApiError(500, "Error registering the user.");
    }

    // Generated access token for the newly created user
    const token = await user.generateUserAccessToken();
    if (!token) {
      throw new ApiError(500, "Error generating access token.");
    }

    // Returning a success response
    return res
      .status(201)
      .json(
        new ApiResponse(
          { UserInfo: createdUser, accessToken: token },
          "User registered successfully.",
          true
        )
      );
  } catch (error) {
    // MongoDB validation error handling
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      throw new ApiError(400, `Validation failed: ${errorMessages.join(", ")}`);
    }
  }
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
  return res.status(200).json(new ApiResponse({}, "User logged out.", true));
});

// View all users (Admins Only)
export const viewUsers = AsyncHandler(async (req, res) => {
  const users = await User.find().select(
    "-password -createdAt -updatedAt -__v "
  );
  const Total_Users = users.length;
  if (users.length === 0) {
    return res.status(404).json(new ApiResponse({}, "No users found!!", true));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        { UserList: users, "Total Users": Total_Users },
        "Showing Search results.......",
        true
      )
    );
});

// search users by name,email,username,role(Admins Only)

export const searchUsers = AsyncHandler(async (req, res) => {
  const { searchTerm } = req.query;

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  let searchConditions = [];

  if (searchTerm.toLowerCase() === "donor") {
    searchConditions.push({ isDonor: true });
  } else if (searchTerm.toLowerCase() === "recipient") {
    searchConditions.push({ isRecipient: true });
  } else {
    // Fuzzy search
    searchConditions = [
      { name: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
      { username: { $regex: searchTerm, $options: "i" } },
    ];

    // Also search by ObjectId if valid
    if (mongoose.Types.ObjectId.isValid(searchTerm)) {
      searchConditions.push({ _id: searchTerm });
    }
  }

  const users = await User.find({ $or: searchConditions }).select(
    "-password -createdAt -updatedAt -__v"
  );

  const Total_Users = users.length;

  if (Total_Users === 0) {
    return res.status(404).json(new ApiResponse({}, "No users found!!", true));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        { UserList: users, "Total Users": Total_Users },
        "Showing Search results.......",
        true
      )
    );
});

// get user Profile
export const getUserProfile = AsyncHandler(async (req, res) => {
  const userEmail = req.user.email;

  const userDetails = await User.find({ email: userEmail }).select(
    "-password -createdAt -updatedAt -__v -_id"
  );
  if (!userDetails) throw ApiError(404, "User not found!!");

  return res
    .status(200)
    .json(
      new ApiResponse(
        { UserInfo: userDetails },
        "User Details returned Successfully!",
        true
      )
    );
});

/*--------------------------- user profile update ----------------------------*/
// update user location

export const updateUserLocation = AsyncHandler(async (req, res, next) => {
  const { city, state } = req.body;

  if (!city || !state) {
    throw new ApiError(400, "City and state are required to update location.");
  }

  // Find the user by email
  const userEmail = req.user.email;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Update the user's location
  user.location.city = city.toLowerCase();
  user.location.state = state.toLowerCase();

  // Save the updated user data
  const updatedUser = await user.save();

  // Return a response
  const updatedUserInfo = updatedUser.toObject();
  delete updatedUserInfo.password;
  delete updatedUserInfo._id;
  delete updatedUserInfo.__v;
  delete updatedUserInfo.createdAt;
  delete updatedUserInfo.updatedAt;

  return res
    .status(200)
    .json(
      new ApiResponse(
        { UserInfo: updatedUserInfo },
        "User location updated successfully.",
        true
      )
    );
});

//update donor/user status

export const updateDonorStatus = AsyncHandler(async (req, res) => {
  const userEmail = req.user.email; // assuming user is authenticated and email is stored in token

  const { isDonor } = req.body;

  if (typeof isDonor !== "boolean") {
    throw new ApiError(
      400,
      "Invalid value for isDonor. Expected true or false."
    );
  }

  const user = await User.findOneAndUpdate(
    { email: userEmail },
    { isDonor: isDonor },
    { new: true, runValidators: true }
  ).select("-password -__v -createdAt -updatedAt");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        { UserInfo: user },
        "Donor status updated successfully!",
        true
      )
    );
});

// update user password

export const updatePassword = AsyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new passwords are required.");
  }

  const userEmail = req.user.email;

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isValid = await user.passwordValidityCheck(currentPassword);
  if (!isValid) {
    throw new ApiError(401, "Current password is incorrect.");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse({}, "Password updated successfully.", true));
});

// update availability

export const updateAvailability = AsyncHandler(async (req, res) => {
  const { availability } = req.body;

  const validDays = ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"];

  if (
    !Array.isArray(availability) ||
    !availability.every((day) => validDays.includes(day))
  ) {
    throw new ApiError(400, "Invalid availability values provided.");
  }

  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.availability = availability;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(user, "Availability updated successfully", true));
});

// update blood type
export const updateBloodType = AsyncHandler(async (req, res) => {
  const { bloodType } = req.body;

  const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  if (!validBloodTypes.includes(bloodType)) {
    throw new ApiError(400, "Invalid blood type provided.");
  }

  const userEmail = req.user.email;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  user.bloodType = bloodType;
  await user.save();

  const updatedUserInfo = user.toObject();
  delete updatedUserInfo.password;
  delete updatedUserInfo._id;
  delete updatedUserInfo.__v;
  delete updatedUserInfo.createdAt;
  delete updatedUserInfo.updatedAt;

  return res
    .status(200)
    .json(
      new ApiResponse(
        { UserInfo: updatedUserInfo },
        "Blood type updated successfully.",
        true
      )
    );
});

// Delete User
export const deleteUser = AsyncHandler(async (req, res, next) => {
  const userEmail = req.user.email;

  const user = await User.findOneAndDelete({ email: userEmail });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Return a success response
  return res
    .status(200)
    .json(new ApiResponse({}, "User deleted successfully.", true));
});
