import express from "express";
import { getEvents,registerEvents } from "../controllers/eventController.js";
import { adminRolecheck } from "../middlewares/userRoleChecking.js";
import verifyUserToken from "../middlewares/auth.middleware.js";
const router = express.Router();

//Admin: Register a new event
router.post("/", verifyUserToken, adminRolecheck, registerEvents);

//  User: Search for upcoming or today's events (NO expired events allowed)
router.get("/search", getEvents);

//  Admin: Search all events including expired
router.get("/expiringEvents", verifyUserToken, adminRolecheck, getEvents);

export default router;