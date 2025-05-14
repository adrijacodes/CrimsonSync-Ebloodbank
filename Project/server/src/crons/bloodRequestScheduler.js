import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";
import User from "../models/userModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";

// Cron runs every 2 minutes
cron.schedule("*/3 * * * *", async () => {
  try {
    console.log("🩸 Cron job triggered to process pending blood requests.");

    const pendingRequests = await BloodRequest.find({ status: "pending" });

    for (const request of pendingRequests) {
      const { _id: bloodID, bloodType, city, recipient } = request;
      console.log(`➡️ Processing Blood Request ID: ${bloodID}`);

      const eligibleDonors = await EligibilityForm.find({
        bloodRequest: bloodID,
      });

      let selectedDonor = null;
      let form = null;

      for (const donorForm of eligibleDonors) {
        const { formData, donor, _id: formId } = donorForm;

        const isEligible = checkEligibility(formData);
        console.log(`👤 Donor ${donor} eligibility: ${isEligible}`);

        await EligibilityForm.findByIdAndUpdate(formId, {
          healthStatus: isEligible ? "Eligible" : "Ineligible",
        });

        if (isEligible) {
          selectedDonor = donor;
          form = formId;
          break;
        } else {
          await sendIneligibilityNotification(donor, bloodID, bloodType);
        }
      }

      if (!selectedDonor) {
        console.log("⚠️ No eligible donors found. Will re-evaluate later.");
        continue;
      }

      const updatedRequest = await BloodRequest.findOneAndUpdate(
        { _id: bloodID, status: "pending" },
        {
          status: "fulfilled",
          donor: selectedDonor._id,
          eligibilityForm: form,
        },
        { new: true }
      );

      if (!updatedRequest) {
        console.log("⛔ Request already fulfilled. Skipping.");
        continue;
      }

      await sendSelectionNotifications(
        selectedDonor,
        recipient,
        bloodID,
        city,
        bloodType
      );

      // Update donor's record
      await User.findByIdAndUpdate(selectedDonor._id, {
        $set: { lastBloodDonationDate: new Date() },
        $push: { userBloodDonationHistory: bloodID },
      });

      await EligibilityForm.updateMany(
        {
          bloodRequest: bloodID,
          donor: { $ne: selectedDonor },
          healthStatus: { $nin: ["Ineligible", "Cancelled"] },
        },
        { $set: { healthStatus: "Cancelled" } }
      );

      await cancelOtherNotifications(
        bloodID,
        selectedDonor._id,
        recipient,
        bloodType,
        city
      );
    }

    console.log("✅ Finished processing all pending blood requests.");
  } catch (err) {
    console.error("❌ Error processing blood requests:", err);
  }
});

// ================= Helper Functions =================

function checkEligibility(formData) {
  const formDataObj = Object.fromEntries(formData);
  const currentDate = new Date();

  const {
    age,
    hadRecentIllness,
    onMedication,
    recentSurgery,
    alcoholUse,
    chronicDiseases,
    covidExposure,
    currentlyPregnant,
    consent,
    lastDonationDate,
  } = formDataObj;


  const lastDate = new Date(lastDonationDate);
  console.log(lastDonationDate);
  
  if (isNaN(lastDate.getTime())) {
    console.warn("⚠️ Invalid lastDonationDate:", lastDonationDate);
    return false;
  }

  const threeMonthsLater = new Date(lastDate);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

  return (
    Number(age) >= 18 &&
    hadRecentIllness === "No" &&
    !onMedication &&
    recentSurgery === "No" &&
    alcoholUse === "No" &&
    chronicDiseases === "No" &&
    covidExposure === "No" &&
    currentlyPregnant === "No" &&
    consent === "Yes" &&
    currentDate >= threeMonthsLater
  );
}

async function sendSelectionNotifications(
  donor,
  recipient,
  bloodID,
  city,
  bloodType
) {
  const donorMessage = `✅ You have been selected for a blood donation request (${bloodType}) in ${city}. Check your Blood Donation tab for more details.`;
  const recipientMessage = `🎉 A donor has been found for your blood request (${bloodType}). View donor details in your Blood Donation tab.`;

  await Promise.all([
    maybeNotify(donor, bloodID, donorMessage),
    donor.toString() !== recipient.toString() &&
      maybeNotify(recipient, bloodID, recipientMessage),
  ]);
}

async function cancelOtherNotifications(
  bloodID,
  selectedDonorId,
  recipientId,
  bloodType,
  city
) {
  const cancelMsg = `⚠️ A blood request for ${bloodType} in ${city} has been fulfilled. A suitable donor has already been selected.`;

  const result = await Notification.updateMany(
    {
      bloodRequestId: bloodID,
      status: "active",
      user: { $nin: [selectedDonorId, recipientId] },
    },
    {
      $set: {
        status: "cancelled",
        type: "info",
        message: cancelMsg,
      },
    }
  );

  console.log("📭 Cancelled notifications:", result.modifiedCount);
}

async function maybeNotify(userId, bloodID, message) {
  const exists = await Notification.findOne({
    user: userId,
    bloodRequestId: bloodID,
    message,
  });

  if (!exists) {
    await Notification.create({
      user: userId,
      bloodRequestId: bloodID,
      message,
      type: "info",
      status: "active",
    });
  }
}

async function sendIneligibilityNotification(userId, bloodID, bloodType) {
  const message = `🚫 Thank you for your interest in donating for blood request (${bloodType}). Based on your eligibility form, you are currently ineligible.`;

  const exists = await Notification.findOne({
    user: userId,
    bloodRequestId: bloodID,
    message,
  });

  if (!exists) {
    await Notification.create({
      user: userId,
      bloodRequestId: bloodID,
      message,
      type: "info",
      status: "active",
    });
  }
}
