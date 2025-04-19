import express from "express"
import { registerUser, loginUser,userLogout } from "../controllers/authcontroller.js";
import verifyUserToken from "../middlewares/auth.middleware.js"
import { adminRolecheck } from "../middlewares/userRoleChecking.js";
import { searchUsers } from "../controllers/authcontroller.js";
import { viewUsers } from "../controllers/authcontroller.js";
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.route("/logout").post();


// Admin Specific Routes

// Search Users
router.get('/search-users',verifyUserToken,adminRolecheck,searchUsers)
router.get('/view-users',verifyUserToken,adminRolecheck,viewUsers)

export default router;
