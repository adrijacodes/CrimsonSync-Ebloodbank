import mongoose from "mongoose";
import User from "../models/userModel.js";
import AsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import BloodRequest from "../models/bloodRequestModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";
import Notification from "../models/notificationsModel.js";
import moment from "moment";

// Create a blood request
export const createBloodRequest = AsyncHandler(async (req, res, next) => {
  const { city, bloodType } = req.body;
  const recipient = req.user;
  const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  //console.log(city,bloodType);

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
    await User.findByIdAndUpdate(recipient._id, {
      $push: { userBloodDonationHistory: bloodRequest._id },
    });
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
    console.log(potentialDonors);

    if (potentialDonors.length === 0) {
      throw new ApiError(
        404,
        `No eligible donors found for blood type ${bloodType} in ${city}.`
      );
    }

    const recipientNotification = new Notification({
      user: recipient._id,
      bloodRequestId: bloodRequest._id,
      message: `Your blood request for type ${bloodType} in ${city} has been submitted. We are actively looking for a donor. You will be notified once a match is found or if the request is fulfilled. Please Wait!`,
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

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, "An error occurred while processing your request.");
  }
});

// eligibility form submission

export const submitEligibilityForm = AsyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const donorId = req.user?._id;
  const { formData } = req.body;
  console.log(formData);

  if (!notificationId || !formData || typeof formData !== "object") {
    throw new ApiError(400, "Notification ID and form data are required.");
  }

  const notification = await Notification.findById(notificationId);
  if (!notification || !notification.bloodRequestId) {
    throw new ApiError(
      404,
      "Notification or associated blood request not found."
    );
  }

  const bloodRequestId = notification.bloodRequestId;

  const bloodRequest = await BloodRequest.findById(bloodRequestId);
  if (!bloodRequest) {
    throw new ApiError(404, "Blood request not found.");
  }

  const existingForm = await EligibilityForm.findOne({
    donor: donorId,
    bloodRequest: bloodRequestId,
  });

  if (existingForm) {
    throw new ApiError(
      400,
      "You have already submitted this form for this request."
    );
  }

  const newForm = await EligibilityForm.create({
    donor: donorId,
    bloodRequest: bloodRequestId,
    formData: formData,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        newForm,
        "Eligibility form submitted successfully. Your response has been recorded. Please wait while we review your eligibility.",
        true
      )
    );
});
