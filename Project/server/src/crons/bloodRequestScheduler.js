import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";
import User from "../models/userModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";

cron.schedule("*/2 * * * *", async () => {
  try {
    console.log("Cron job triggered to process pending blood requests.");

    const pendingRequests = await BloodRequest.find({ status: "pending" });

    for (const request of pendingRequests) {
      const { _id: bloodID, bloodType, city, recipient } = request;
      console.log(`Processing Blood Request ID: ${bloodID}`);

      const eligibleDonors = await EligibilityForm.find({
        bloodRequest: bloodID,
      });

      let selectedDonor = null;
      let form;
      for (let donorForm of eligibleDonors) {
        const { formData, donor, _id: formId } = donorForm;
        const isEligible = checkEligibility(formData);
        console.log(`Eligibility for donor ${donor}: ${isEligible}`);

        if (isEligible) {
          await EligibilityForm.findByIdAndUpdate(formId, {
            healthStatus: "Eligible",
          });

          selectedDonor = donor;
          form = formId;
          break;
        } else {
          await EligibilityForm.findByIdAndUpdate(formId, {
            healthStatus: "Ineligible",
          });
          try {
            await sendIneligibilityNotification(donor, bloodID, bloodType);
          } catch (err) {
            console.error(
              `Failed to send ineligibility notification to donor ${donor}:`,
              err
            );
          }
        }
      }

      if (!selectedDonor) {
        console.log("No eligible donors found. Will re-evaluate later.");
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
        console.log("Request already fulfilled. Skipping.");
        continue;
      }

      await sendSelectionNotifications(
        selectedDonor,
        recipient,
        bloodID,
        city,
        bloodType
      );

      // Update donor
      await User.findByIdAndUpdate(selectedDonor._id, {
        $set: { lastBloodDonationDate: new Date() },
        $push: { userBloodDonationHistory: bloodID },
      });

      await EligibilityForm.updateMany(
        {
          bloodRequest: bloodID,
          donor: { $ne: selectedDonor },
          healthStatus: { $ne: ["Ineligible", "Cancelled"] },
        },
        { $set: { healthStatus: "Cancelled" } }
      );

      // Cancel and thank rejected donors
      await cancelOtherNotifications(
        bloodID,
        selectedDonor._id,
        recipient,
        bloodType,
        city
      );
    }

    console.log("Finished processing all pending blood requests.");
  } catch (err) {
    console.error("Error processing blood requests:", err);
  }
});

/*Other Helper Functions */
function checkEligibility(formData) {
  console.log("entering");
  
  const formDataObj = Object.fromEntries(formData);
console.log(formDataObj.lastDonationDate);

  // 3-month date check
  const lastDonationDate = new Date(formDataObj.lastDonationDate);
  const currentDate = new Date();

  const threeMonthsLater = new Date(lastDonationDate);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  console.log(threeMonthsLater);
  

  return (
    Number(formDataObj.age) >= 18 &&
    formDataObj.hadRecentIllness === "No" &&
    !formDataObj.onMedication &&
    formDataObj.recentSurgery === "No" &&
    formDataObj.alcoholUse === "No" &&
    formDataObj.chronicDiseases === "No" &&
    formDataObj.covidExposure === "No" &&
    formDataObj.currentlyPregnant === "No" &&
    formDataObj.consent === "Yes" &&
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
  const donorContent = `You have been selected for a blood donation request Blood Type: ${bloodType} in ${city}. Check Blood donation tab for further details.`;
  const recipientContent = `A donor has been found for your blood request. Check Blood donation tab for donor details.`;

  await Promise.all([
    maybeNotify(donor, bloodID, donorContent),
    donor.toString() !== recipient.toString() &&
      maybeNotify(recipient, bloodID, recipientContent),
  ]);
}

async function cancelOtherNotifications(
  bloodID,
  selectedDonorId,
  recipientId,
  bloodType,
  city
) {
  const cancelMessage = `A blood request for ${bloodType} in the city ${city} was sent. However, a suitable donor has already been found for this blood request.`;

  const cancelledNotifications = await Notification.find({
    bloodRequestId: bloodID,
    status: "active",
    user: { $nin: [selectedDonorId, recipientId] },
  });

  console.log("Logging the cancelled notifications:", cancelledNotifications);

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
        message: cancelMessage,
      },
    }
  );

  console.log("Notifications cancelled:", result.modifiedCount);
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
  const message = `Thank you for showing interest in donating for blood request ${bloodType}, but based on your eligibility form, you are currently ineligible.`;

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
