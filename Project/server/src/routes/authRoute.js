import express from "express";
import {
  registerUser,
  loginUser,
  userLogout,
} from "../controllers/authcontroller.js";
import verifyUserToken from "../middlewares/auth.middleware.js";
import verifyUserToken1 from "../middlewares/userAuth.middlewares.js";
import {
  adminRolecheck,
  userRolecheck,
} from "../middlewares/userRoleChecking.js";
import { searchUsers } from "../controllers/authcontroller.js";
import { viewUsers } from "../controllers/authcontroller.js";
import { getUserProfile } from "../controllers/authcontroller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyUserToken1,userRolecheck,userLogout);

//Protected user routes
// get user profile
router.get("/profile", verifyUserToken1, userRolecheck, getUserProfile);

// Admin Specific Routes

// Search Users
router.get("/search-users", verifyUserToken, adminRolecheck, searchUsers);
router.get("/view-users", verifyUserToken, adminRolecheck, viewUsers);

export default router;
