import express from "express";
import { events } from "../controllers/eventController.js";
const router = express.Router();

router.post("/", events);

export default router;
