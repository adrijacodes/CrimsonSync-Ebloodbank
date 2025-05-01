import express from "express";
import {
  registerUser,
  loginUser,
  userLogout,
  searchUsers,
  viewUsers,
  getUserProfile,
  updateUserLocation,
  updateDonorStatus,
  updatePassword,
  updateAvailability,
  deleteUser,
  updateBloodType,
} from "../controllers/authcontroller.js";
import verifyUserToken from "../middlewares/auth.middleware.js";
import verifyUserToken1 from "../middlewares/userAuth.middlewares.js";
import {
  adminRolecheck,
  userRolecheck,
} from "../middlewares/userRoleChecking.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyUserToken1, userRolecheck, userLogout);

/*-------------Protected user routes--------------------*/

// get user profile route
router.get("/profile", verifyUserToken1, userRolecheck, getUserProfile);

// update user routes
router.put(
  "/profile/update-location",
  verifyUserToken1,
  userRolecheck,
  updateUserLocation
);
router.patch(
  "/profile/update-donor-status",
  verifyUserToken1,
  userRolecheck,
  updateDonorStatus
);
router.patch("/profile/update-password", verifyUserToken1, updatePassword);
router.patch(
  "/profile/update-availability",
  verifyUserToken1,
  updateAvailability
);
router.put("/profile/update-blood-type", verifyUserToken1, updateBloodType);

// DELETE user route
router.delete("/profile/delete", verifyUserToken1, deleteUser);

/*------------ Admin Specific Routes--------------------*/

// Search Users
router.get("/search-users", verifyUserToken, adminRolecheck, searchUsers);
router.get("/view-users", verifyUserToken, adminRolecheck, viewUsers);

export default router;
