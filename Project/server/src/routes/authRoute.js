import express from "express"
import { registerUser, loginUser,userLogout } from "../controllers/authcontroller.js";
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.route("/logout").post();


export default router;
