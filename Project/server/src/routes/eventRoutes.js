import express from "express";
import { getEvents,registerEvents } from "../controllers/eventController.js";
const router = express.Router();

router.post("/",registerEvents);
router.get("/", getEvents);

export default router;