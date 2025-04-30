import express from "express";
import { registerAdmin } from "../controllers/adminauthcontroller.js";
import {
  loginAdmin,
  adminLogout,
  updatePassword,
  getAdminProfile,
  deleteAdmin,
} from "../controllers/adminauthcontroller.js";
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

//update admin password
router
  .route("/profile/update-password")
  .patch(verifyUserToken, adminRolecheck, updatePassword);

// update admin profile
router.route("/profile").get(verifyUserToken, adminRolecheck, getAdminProfile);
// delete admin
router.delete("/profile/delete", verifyUserToken, deleteAdmin);

// Search/View Admins
router.get("/search-admins", verifyUserToken, adminRolecheck, searchAdmins);
router.get("/view-admins", verifyUserToken, adminRolecheck, viewAdmins);
export default router;
