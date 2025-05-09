import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";
import User from "../models/userModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";

// cron checks for every pending eligible form find the blood requestID and check if it is fulfilled..if it is fulfilled then sent a notification to the donor of the eligible form saying const content = `Thank you for accepting the blood donation request (Blood Type: ${bloodType}) in ${city}. However, another eligible donor has already been selected. We appreciate your willingness to help and hope you'll stay available for future opportunities.`;

cron.schedule("*/2 * * * *", async () => {
  console.log("Running scheduled job to check eligibility forms...");

  try {
   // Get all pending eligibility forms
    const pendingForms = await EligibilityForm.find({ status: "pending" });
    console.log(pendingForms);
    
    for (let form of pendingForms) {
      const { bloodRequestId, user: userId } = form;

      // Step 2: Get blood request details
      const bloodRequest = await BloodRequest.findById(bloodRequestId);
      if (!bloodRequest) continue;

      // Step 3: Check if blood request is fulfilled
      if (bloodRequest.status === "fulfilled") {
        // Step 4: Send notification to the donor
        const content = `Thank you for accepting the blood donation request (Blood Type: ${bloodRequest.bloodType}) in ${bloodRequest.city}. However, another eligible donor has already been selected. We appreciate your willingness to help and hope you'll stay available for future opportunities.`;

        await Notification.create({
          user: userId,
          bloodRequestId,
          message: content,
          type: "info",
          status: "active",
        });

        // Optionally, update the form status to "notified" to avoid reprocessing
        form.status = "notified";
        await form.save();
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
