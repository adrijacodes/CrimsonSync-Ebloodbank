import express from "express";
import {
  createBloodRequest,
  submitEligibilityForm,
} from "../controllers/searchdonorcontroller.js";
import verifyUserToken1 from "../middlewares/userAuth.middlewares.js";
import {
  adminRolecheck,
  userRolecheck,
} from "../middlewares/userRoleChecking.js";
const router = express.Router();

//creating new search blood request
router
  .route("/search-blood")
  .post(verifyUserToken1, userRolecheck, createBloodRequest);

//submitting eligibility form
router
  .route("/eligibility-form/:notificationId")
  .post(verifyUserToken1, userRolecheck, submitEligibilityForm);

export default router;
