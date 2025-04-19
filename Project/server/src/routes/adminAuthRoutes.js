import express from "express";
import { registerAdmin } from "../controllers/adminauthcontroller.js";
import { loginAdmin, adminLogout } from "../controllers/adminauthcontroller.js";
import verifyUserToken from "../middlewares/auth.middleware.js";
import { adminRolecheck } from "../middlewares/userRoleChecking.js";
import {
  searchAdmins,
  viewAdmins,
} from "../controllers/adminauthcontroller.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.route("/logout").post(verifyUserToken, adminRolecheck, adminLogout);

// Search/View Admins
router.get("/search-admins", verifyUserToken, adminRolecheck, searchAdmins);
router.get("/view-admins", verifyUserToken, adminRolecheck, viewAdmins);
export default router;
