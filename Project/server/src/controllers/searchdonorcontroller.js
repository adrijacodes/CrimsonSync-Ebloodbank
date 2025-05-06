import mongoose from "mongoose";
import User from "../models/userModel.js";
import AsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";
import moment from "moment";

// Create a blood request
export const createBloodRequest = AsyncHandler(async (req, res) => {
  const { city, bloodType } = req.body;
  const recipient = req.user;
  const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  if (!city || !bloodType) {
    throw new ApiError(400, "City and Blood Type are required fields.");
  }

  if (!validBloodTypes.includes(bloodType)) {
    throw new ApiError(400, "Invalid blood type provided.");
  }

  const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const todayIndex = new Date().getDay();
  const day = days[todayIndex];

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
  
    const bloodRequest = new BloodRequest({
      recipient: recipient._id,
      city: city.toLowerCase(),
      bloodType,
      day,
    });
    

    await bloodRequest.save({ session });

    const potentialDonors = await User.find({
      _id: { $ne: recipient._id },
      bloodType,
      "location.city": city.toLowerCase(),
      $or: [
        {
          lastBloodDonationDate: {
            $lt: moment().subtract(3, "months").toDate(),
          },
        },
        { lastBloodDonationDate: { $exists: false } },
      ],
      availability: { $in: [day] },
      isDonor: true,
    });

    if (potentialDonors.length === 0) {
      throw new ApiError(
        404,
        `No eligible donors found for blood type ${bloodType} in ${city}.`
      );
    }

    const recipientNotification = new Notification({
      user: recipient._id,
      bloodRequestId: bloodRequest._id,
      message: `Your blood request for type ${bloodType} in ${city} has been submitted. We are actively looking for a donor. You will be notified once a match is found or if the request is fulfilled. Please Wait`,
      type: "info",
      status: "active",
      isSeen: false,
    });

    await recipientNotification.save({ session });
    

    const donorNotifications = potentialDonors.map((donor) => {
      return new Notification({
        user: donor._id,
        bloodRequestId: bloodRequest._id,
        message: `A request for blood type ${bloodType} in ${city} is available. Are you available to donate? `,
        type: "action_required",
        status: "active",
        isSeen: false,
      }).save({ session });
    });

    await Promise.all(donorNotifications);

    await session.commitTransaction();
    session.endSession();

    return res
      .status(201)
      .json(
        new ApiResponse(
          null,
          `The blood request for type ${bloodType} in city ${city} has been created successfully. Notifications have been sent to potential donors.`,
          true
        )
      );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(
      "Error creating blood request or sending notifications:",
      error
    );
    throw new ApiError(500, "An error occurred while processing your request.");
  }
});

