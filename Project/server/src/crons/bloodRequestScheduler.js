import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";
import Notification from "../models/notificationsModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// Run cron job every 30secs/2min for testing (change to "*/15 * * * *" for production)
cron.schedule("*/2 * * * * ", async () => {
  try {
    console.log("Cron job triggered to process pending blood requests.");

    const [pendingRequests, pendingCount] = await Promise.all([
      BloodRequest.find({ status: "pending" }),
      BloodRequest.countDocuments({ status: "pending" }),
    ]);

    console.log(`Found ${pendingCount} pending blood requests.`);

    for (const request of pendingRequests) {
      const { _id: bloodID, bloodType, city, recipient } = request;
      console.log(`Processing Blood Request ID: ${bloodID}`);

      const eligibleDonors = await EligibilityForm.find({
        bloodRequest: bloodID,
      });
      console.log(eligibleDonors);

      let selectedDonor = null;

      for (let donorForm of eligibleDonors) {
        const { formData, donor, _id: formId } = donorForm;
        // console.log(donorForm);

        const isEligible = checkEligibility(formData);
        console.log(isEligible);

        if (isEligible) {
          await EligibilityForm.findByIdAndUpdate(formId, {
            healthStatus: "Eligible",
          });

          selectedDonor = donor;
          console.log(selectedDonor._id);

          break;
        } else {
          await EligibilityForm.findByIdAndUpdate(formId, {
            healthStatus: "Ineligible",
          });
          await sendIneligibilityNotification(donor, bloodID);
        }
      }

      if (!selectedDonor) {
        console.log("No eligible donors found. Will re-evaluate later.");
        continue;
      }

      // Send selection notification to donor and recipient
      await sendNotification(selectedDonor, bloodID, request);

      // Mark the request as fulfilled
      await BloodRequest.findByIdAndUpdate(bloodID, {
        status: "fulfilled",
        donor: selectedDonor._id,
      });

      // Update last donation date
      console.log(selectedDonor._id);

      await User.findByIdAndUpdate(selectedDonor._id, {
        $set: { lastBloodDonationDate: new Date() },
        $push: { userBloodDonationHistory: bloodID }
      });
      

      // Notify rejected donors
      const rejectedForms = await EligibilityForm.find({
        bloodRequest: bloodID,
        donor: { $ne: selectedDonor },
        healthStatus: { $ne: "Ineligible" },
      });

      // Mark all other donors as ineligible
      await EligibilityForm.updateMany(
        {
          donor: { $ne: selectedDonor },
          bloodRequest: bloodID,
          healthStatus: { $ne: "Ineligible" },
        },
        {
          $set: { healthStatus: "Ineligible" },
        }
      );

      // Update notification status for pending notifications related to the same bloodID
      const toBeRejectedNotifications = await Notification.find({
        bloodRequest: bloodID,
        status: "active",
        user: { $nin: [selectedDonor._id, recipient] },
      });

      console.log(
        "Notifications to be marked as rejected:",
        toBeRejectedNotifications
      );

      await Notification.updateMany(
        {
          bloodRequestId: bloodID,
          // status: "seen",
          user: { $nin: [selectedDonor._id, recipient] }, // exclude selected donor & recipient
        },
        {
          $set: {
            status: "cancelled",
            type: "info",
            message:
              "A suitable donor has already been found for this blood request.",
          },
        }
      );

      await sendCancellationNotification(rejectedForms, city, bloodType);
    }

    console.log("Finished processing all pending blood requests.");
  } catch (err) {
    console.error("Error processing blood requests:", err);
  }
});

// ---------------------------------------------

function checkEligibility(formData) {
  const formDataObj = Object.fromEntries(formData);

  return (
    Number(formDataObj.age) >= 18 &&
    // Number(formDataObj.weight) >= 50 &&
    formDataObj.hadRecentIllness === "No" &&
    !formDataObj.onMedication &&
    formDataObj.recentSurgery === "No" &&
    formDataObj.alcoholUse === "No" &&
    formDataObj.chronicDiseases === "No" &&
    formDataObj.covidExposure === "No" &&
    formDataObj.currentlyPregnant === "No" &&
    formDataObj.consent === "Yes"
  );
}

async function sendNotification(donor, bloodID, request) {
  const donorContent = `You have been selected for a blood donation request Blood Type: ${request.bloodType} in ${request.city}. Check Blood donation tab for further details`;
  const recipientContent = `A donor has been found for your blood request. Check Blood donation tab for donor details`;

  await Notification.create({
    user: donor,
    bloodRequestId: bloodID,
    message: donorContent,
    type: "info",
    status: "active",
  });

  await Notification.create({
    user: request.recipient,
    bloodRequestId: bloodID,
    message: recipientContent,
    type: "info",
    status: "active",
  });
}

async function sendIneligibilityNotification(donor, bloodID) {
  const content = `Unfortunately, you are not eligible for the blood donation request.`;

  await Notification.create({
    user: donor,
    message: content,
    bloodRequestId: bloodID,
    type: "info",
    status: "active",
  });
}

async function sendCancellationNotification(rejectedForms, city, bloodType) {
  const content = `Thank you for accepting the blood donation request (Blood Type: ${bloodType}) in ${city}. However, another eligible donor has already been selected. We appreciate your willingness to help and hope you'll stay available for future opportunities.`;

  for (let form of rejectedForms) {
    await Notification.create({
      user: form.donor,
      bloodRequestId: form.bloodRequest,
      message: content,
      type: "info",
      status: "active",
    });
  }
}
