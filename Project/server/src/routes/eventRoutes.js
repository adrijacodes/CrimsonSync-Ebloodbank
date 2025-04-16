import express from "express";
import { getEvents,registerEvents } from "../controllers/eventController.js";
import { adminRolecheck } from "../utils/userRoleChecking.js";
import verifyUserToken from "../utils/auth.middleware.js";
const router = express.Router();

router.post("/",verifyUserToken,adminRolecheck,registerEvents);
router.get("/", getEvents);

export default router;