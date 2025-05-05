import express from "express";
import { createBloodRequest } from "../controllers/searchdonorcontroller.js";
import verifyUserToken1 from "../middlewares/userAuth.middlewares.js";
import {
  adminRolecheck,
  userRolecheck,
} from "../middlewares/userRoleChecking.js";
const router = express.Router();

router
  .route("/search-blood")
  .post(verifyUserToken1, userRolecheck, createBloodRequest);

export default router;
