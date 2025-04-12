import express from "express";
import { registerAdmin } from "../controllers/adminauthcontroller.js";
import { loginAdmin ,adminLogout } from "../controllers/adminauthcontroller.js";
import verifyUserToken from "../utils/auth.middleware.js";
import { adminRolecheck } from "../utils/userRoleChecking.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post('/login',loginAdmin)
router.route("/logout").post(verifyUserToken,adminRolecheck,adminLogout);

export default router;
