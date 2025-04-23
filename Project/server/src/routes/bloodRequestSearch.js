import express from "express";
import { searchdonors } from "../controllers/searchdonorcontroller.js";
import verifyUserToken from "../middlewares/auth.middleware.js";
import verifyUserToken1 from "../middlewares/userAuth.middlewares.js";
import {
  adminRolecheck,
  userRolecheck,
} from "../middlewares/userRoleChecking.js";
const router = express.Router();

router
  .route("/search-donors")
  .get(verifyUserToken1, userRolecheck, searchdonors);

  export default router;