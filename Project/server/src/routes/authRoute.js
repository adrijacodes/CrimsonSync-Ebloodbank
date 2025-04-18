import express from "express"
import { registerUser, loginUser,userLogout } from "../controllers/authcontroller.js";
import verifyUserToken from "../utils/auth.middleware.js";
import { adminRolecheck } from "../utils/userRoleChecking.js";
import { searchUsers } from "../controllers/authcontroller.js";
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.route("/logout").post();


// Admin Specific Routes

// Search Users
router.get('/search-users',verifyUserToken,adminRolecheck,searchUsers)

export default router;
