import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import AsyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";

export const registerAdmin = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError(409, "Admin with this email already exists.");
  }

  try {
    const admin = await Admin.create({
      name: name?.toLowerCase(),
      email,
      password,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
      "-password -__v -createdAt -updatedAt"
    );
    if (!createdAdmin) {
      throw new ApiError(500, "Error registering the admin.");
    }

    // Generated an access token for the newly created admin
    const token = await admin.generateUserAccessToken();
    if (!token) {
      throw new ApiError(500, "Error generating access token.");
    }

    // response with the admin data and token
    return res
      .status(201)
      .json(
        new ApiResponse(
          { AdminInfo: createdAdmin, accessToken: token },
          "Admin registered successfully.",
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
  return res.status(200).json(new ApiResponse({}, "User logged out.", true));
});

// View all admins
export const viewAdmins = AsyncHandler(async (req, res) => {
  const admins = await Admin.find().select(
    "-password -createdAt -updatedAt -__v "
  );
  const Total_Admins = admins.length;
  if (admins.length === 0) {
    return res.status(404).json(new ApiResponse({}, "No admins found!!", true));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        { AdminList: admins, "Total Users": Total_Admins },
        "Showing Search results.......",
        true
      )
    );
});
// search admins by name,email
export const searchAdmins = AsyncHandler(async (req, res) => {
  //console.log("entering");

  const { searchTerm } = req.query;
  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  const admins = await Admin.find({
    $or: [
      { adminName: { $regex: searchTerm, $options: "i" } }, // Search by name
      { email: { $regex: searchTerm, $options: "i" } }, // Search by email
    ],
  }).select("-password -createdAt -updatedAt -__v ");
  //console.log(admins);

  const Total_Admins = admins.length;
  if (admins.length === 0) {
    return res.status(404).json(new ApiResponse({}, "No admins found!!", true));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        { AdminList: admins, "Total Admins": Total_Admins },
        "Showing Search results.......",
        true
      )
    );
});
// update admin password
export const updatePassword = AsyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new passwords are required.");
  }

  const adminEmail = req.user.email;

  const user = await Admin.findOne({ email: adminEmail });
  if (!user) {
    throw new ApiError(404, "Admin not found.");
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
// get admin profile
export const getAdminProfile = AsyncHandler(async (req, res) => {
  const adminEmail = req.user.email;

  const adminDetails = await Admin.find({ email: adminEmail }).select(
    "-password -createdAt -updatedAt -__v -_id"
  );
  if (!adminDetails) throw ApiError(404, "Admin not found!!");

  return res
    .status(200)
    .json(
      new ApiResponse(
        { AdminInfo: adminDetails },
        "Admin Details returned Successfully!",
        true
      )
    );
});

// Delete Admin
export const deleteAdmin = AsyncHandler(async (req, res, next) => {
  const adminEmail = req.user.email;

  const user = await Admin.findOneAndDelete({ email: adminEmail });

  if (!user) {
    throw new ApiError(404, "Admin not found.");
  }

  // Return a success response
  return res
    .status(200)
    .json(new ApiResponse({}, "Admin deleted successfully.", true));
});
