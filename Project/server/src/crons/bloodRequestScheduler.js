import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";
import Notification from "../models/notificationsModel.js";

// Run cron job every 15 minutes "*/15 * * * *"
cron.schedule("*/30 * * * * *", async () => {
  console.log("Cron job triggered to process pending blood requests.");

  const [pendingRequests, pendingCount] = await Promise.all([
    BloodRequest.find({ status: "pending" }),
    BloodRequest.countDocuments({ status: "pending" }),
  ]);

  console.log(`Found ${pendingCount} pending blood requests.`);

  for (const request of pendingRequests) {
    const { _id } = request;
    console.log(`Processing Blood Request ID: ${_id}`);

    const eligibleDonors = await EligibilityForm.find({ bloodRequest: _id });
    let selectedDonorArray = [];

    for (let eligibleDonor of eligibleDonors) {
      console.log("Eligible donor found. Proceeding with selection.");

      const { formData, donor, _id: formId } = eligibleDonor;
      const isEligible = checkEligibility(formData);

      if (isEligible) {
        await EligibilityForm.findByIdAndUpdate(formId, {
          healthStatus: "Eligible",
        });

        selectedDonorArray.push(donor);
        break; // Stop after first eligible donor
      } else {
        await EligibilityForm.findByIdAndUpdate(formId, {
          healthStatus: "Ineligible",
        });

        await sendIneligibilityNotification(donor);
      }
    }

    if (selectedDonorArray.length === 0) {
      console.log("No eligible donors found.Lets Wait for some time");

      // await EligibilityForm.updateMany(
      //   { bloodRequest: _id },
      //   { healthStatus: "Ineligible" }
      // );

      // const donorIds = eligibleDonors.map(d => d.donor);
      // await sendCancellationNotification(donorIds);
    } else {
      const firstEligibleDonor = selectedDonorArray[0];
      await sendNotification(firstEligibleDonor, request);

      await BloodRequest.findByIdAndUpdate(_id, { status: "fulfilled" });
      await Notification.updateMany({ requestId: _id }, { status: "canceled" });
    }
  }

  console.log("Finished processing all pending blood requests.");
});


// Function to check donor eligibility

function checkEligibility(formData) {
  console.log("Fetching donor eligibility data.");

  const formDataObj = Object.fromEntries(formData);
  console.log(formDataObj);

  const eighteenYearsOld = Number(formDataObj.age) >= 18;
  const validWeight = Number(formDataObj.weight) >= 50;
  const noIllness = formDataObj.hadRecentIllness === "No";
  const noMedication = !formDataObj.onMedication;
  const noSurgery = formDataObj.recentSurgery === "No";
  const noAlcohol = formDataObj.alcoholUse === "No";
  const noChronic = formDataObj.chronicDiseases === "No";
  const noCovid = formDataObj.covidExposure === "No";
  const notPregnant = formDataObj.currentlyPregnant === "No";
  const hasConsented = formDataObj.consent === "Yes";
  return (
    eighteenYearsOld &&
    validWeight &&
    noIllness &&
    noMedication &&
    noSurgery &&
    noAlcohol &&
    noChronic &&
    noCovid &&
    notPregnant &&
    hasConsented
  );
}

// Function to send notification to eligible donor and recipient
async function sendNotification(donor, request) {
  const donorContent = `You have been selected for a blood donation request (Blood Type: ${request.bloodType}) in ${request.location}.`;
  const recipientContent = `A donor has been found for your blood request. Donor: ${donor.name}.`;

  // Create notifications for the donor and the recipient
  await Notification.create({
    userId: donor.userId,
    content: donorContent,
    type: "donor-notification",
    status: "pending",
    requestId: request._id,
  });

  await Notification.create({
    userId: request.recipientId,
    content: recipientContent,
    type: "recipient-notification",
    status: "pending",
    requestId: request._id,
  });
}

// Function to send ineligibility notification to donor
async function sendIneligibilityNotification(donor) {
  const content = `Unfortunately, you are not eligible for the blood donation request.`;

  await Notification.create({
    user: donor.userId,
    content: content,
    type: "ineligibility-notification",
    status: "pending",
  });
}

// Function to send cancellation notification to recipient and donors
async function sendCancellationNotification(recipientId, bloodType, location) {
  const content = `Unfortunately, no eligible donors were found for your blood request (Blood Type: ${bloodType}) in ${location}. The request has been cancelled.`;

  // Notify recipient about the cancellation
  await Notification.create({
    userId: recipientId,
    content: content,
    type: "cancellation-notification",
    status: "pending",
  });

  // Notify all donors about the cancellation
  const donors = await Donor.find({
    acceptedRequest: true,
    eligibilityFormSubmitted: true,
    bloodType: bloodType,
    location: location,
  });

  for (let donor of donors) {
    await Notification.create({
      userId: donor.userId,
      content: `Unfortunately, no eligible donors were found for the blood request (Blood Type: ${bloodType}) in ${location}.`,
      type: "cancellation-notification",
      status: "pending",
    });
  }
}
