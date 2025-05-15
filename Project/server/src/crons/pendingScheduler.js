import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";

// CRON JOB 1: Cancel accepted eligibility if another donor fulfilled it
function cancelAcceptedEligibilityIfFulfilled() {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running: Check accepted eligibility forms...");

    try {
      const ineligibleForms = await EligibilityForm.find({
        healthStatus: "Cancelled",
      });

      for (const form of ineligibleForms) {
        const { bloodRequest, donor: formDonor } = form;
        const bloodReq = await BloodRequest.findById(bloodRequest);

        if (!bloodReq || bloodReq.status !== "fulfilled") continue;

        // Ensure someone else fulfilled it
        if (bloodReq.donor.toString() !== formDonor.toString()) {
          const existingNotif = await Notification.findOne({
            user: formDonor,
            bloodRequestId: bloodRequest,
            type: "info",
          });

          if (!existingNotif) {
            const message = `Thank you for accepting the blood donation request (Blood Type: ${bloodReq.bloodType}) in ${bloodReq.city}. However, another eligible donor has already been selected. We appreciate your willingness to help and hope you'll stay available for future opportunities.`;

            await Notification.create({
              user: formDonor,
              bloodRequestId: bloodRequest,
              message,
              type: "info",
              status: "active",
            });

            console.log(`Info notification sent to donor ${formDonor}`);
          }
        }
      }
    } catch (error) {
      console.error("Error in eligibility check:", error);
    }
  });
}

// CRON JOB 2: Mark pending eligibility forms as ineligible if request is fulfilled
function cancelPendingFormsIfRequestFulfilled() {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running: Check pending eligibility forms...");

    try {
      const pendingForms = await EligibilityForm.find({
        healthStatus: "Pending",
      });

      await Promise.all(
        pendingForms.map(async (form) => {
          const bloodReq = await BloodRequest.findById(form.bloodRequest);
          if (bloodReq && bloodReq.status === "fulfilled") {
            await EligibilityForm.findByIdAndUpdate(form._id, {
              healthStatus: "Ineligible",
            });
            console.log(`Form ${form._id} marked as Ineligible`);
          }
        })
      );
    } catch (error) {
      console.error("Error in pending form check:", error);
    }
  });
}

// CRON JOB 4: Cancel active notifications if blood request itself was cancelled
function cancelNotificationsForCancelledRequests() {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running: Check cancelled blood requests...");

    try {
      const cancelledRequests = await BloodRequest.find({
        status: "cancelled",
      });

      for (const request of cancelledRequests) {
        const { _id: bloodRequestId, bloodType, city } = request;

        const activeNotifs = await Notification.find({
          bloodRequestId,
          status: "active",
        });

        if (activeNotifs.length > 0) {
          const cancelMessage = `The blood request for ${bloodType} in ${city} has been cancelled. Thank you for your willingness to help. We hope you'll stay available for future opportunities.`;

          await Notification.updateMany(
            { _id: { $in: activeNotifs.map((n) => n._id) } },
            {
              $set: {
                status: "cancelled",
                type: "info",
                message: cancelMessage,
              },
            }
          );

          console.log(
            `Cancelled ${activeNotifs.length} notifications for request ${bloodRequestId}`
          );
        }
      }
    } catch (error) {
      console.error("Error in cancelled request notification cron:", error);
    }
  });
}

export {
  cancelAcceptedEligibilityIfFulfilled,
  cancelPendingFormsIfRequestFulfilled,
  cancelNotificationsForCancelledRequests,
};
