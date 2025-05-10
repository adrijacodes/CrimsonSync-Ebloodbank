import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";

//Cancels accepted eligibility forms if someone else has fulfilled the blood request.

function pendingAcceptedBloodRequestCancellation() {
  cron.schedule("*/2 * * * *", async () => {
    console.log("Running scheduled job to check accepted eligibility forms...");

    try {
      const eligibleForms = await EligibilityForm.find({
        healthStatus: "Ineligible",
      });

      for (let form of eligibleForms) {
        const { bloodRequest, donor: formDonor } = form;

        const bloodReq = await BloodRequest.findById(bloodRequest);
        const notif = await Notification.findOne({
          bloodRequestId: bloodRequest,
          status: "accepted",
          user: formDonor,
        });

        if (!bloodReq || !notif) continue;

        // If someone else fulfilled the request
        if (
          bloodReq.status === "fulfilled" &&
          bloodReq.donor.toString() !== formDonor.toString()
        ) {
          // Check if info notification already exists for this user and request
          const existingInfo = await Notification.findOne({
            user: formDonor,
            bloodRequestId: bloodRequest,
            type: "info",
          });

          if (!existingInfo) {
            const content = `Thank you for accepting the blood donation request (Blood Type: ${bloodReq.bloodType}) in ${bloodReq.city}. However, another eligible donor has already been selected. We appreciate your willingness to help and hope you'll stay available for future opportunities.`;

            await Notification.create({
              user: formDonor,
              bloodRequestId: bloodRequest,
              message: content,
              type: "info",
              status: "active",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error in cron job (eligible form check):", error);
    }
  });
}

//Marks pending eligibility forms as ineligible if the request has already been fulfilled.

function pendingFormsCancellation() {
  cron.schedule("*/3 * * * *", async () => {
    console.log("Running scheduled job to check pending eligibility forms...");

    try {
      const pendingForms = await EligibilityForm.find({
        healthStatus: "pending",
      });

      for (let form of pendingForms) {
        const { _id, bloodRequest } = form;

        const bloodReq = await BloodRequest.findById(bloodRequest);
        if (!bloodReq) continue;

        if (bloodReq.status === "fulfilled") {
          await EligibilityForm.findByIdAndUpdate(_id, {
            healthStatus: "Ineligible",
          });
          console.log(`Form ${_id} marked as ineligible`);
        }
      }
    } catch (error) {
      console.error("Error in cron job (pending form check):", error);
    }
  });
}

export { pendingAcceptedBloodRequestCancellation, pendingFormsCancellation };
