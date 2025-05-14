import cron from "node-cron";
import BloodRequest from "../models/bloodRequestModel.js";
import Notification from "../models/notificationsModel.js";
import EligibilityForm from "../models/eligibilityFormModel.js";

//Cancels accepted eligibility forms if someone else has fulfilled the blood request.

function pendingAcceptedBloodRequestCancellation() {
  cron.schedule("*/3 * * * *", async () => {
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
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running scheduled job to check pending eligibility forms...");

    try {
      const pendingForms = await EligibilityForm.find({
        healthStatus: "Pending",
      });
      console.log(pendingForms);
      
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
// start a cron function  find fullfilled bloodrequests and check if a active notification of the id is present if present then show the below logic
function startCronJob() {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running scheduled job to check fulfilled blood requests...");

    try {
      // Find all fulfilled blood requests
      const fulfilledRequests = await BloodRequest.find({
        status: "fulfilled",
      });

      // Loop through each fulfilled blood request
      for (let request of fulfilledRequests) {
        const { _id, bloodType, city, donor, recipient } = request;

        // Call the function to cancel other notifications
        await cancelOtherNotifications(
          _id,
          donor.toString(),
          recipient.toString(),
          bloodType,
          city
        );
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
}

// Function to cancel notifications for non-selected users
async function cancelOtherNotifications(
  bloodID,
  selectedDonorId,
  recipientId,
  bloodType,
  city
) {
  const cancelMessage = `A blood request for ${bloodType} in the city ${city} was sent. However, a suitable donor has already been found for this blood request.`;

  try {
    // Find active notifications for the blood request, excluding selected donor and recipient
    const cancelledNotifications = await Notification.find({
      bloodRequestId: bloodID,
      status: "active",
      user: { $nin: [selectedDonorId, recipientId] },
    });

    if (cancelledNotifications.length === 0) {
      console.log("No notifications to cancel for this blood request.");
      return;
    }

    console.log("Logging the cancelled notifications:", cancelledNotifications);

    // Update the notifications to cancelled
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

    console.log(`${result.modifiedCount} notifications cancelled.`);
  } catch (error) {
    console.error("Error in canceling notifications:", error);
  }
}

function cancelCancelledRequestNotifications() {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running scheduled job to check cancelled blood requests...");

    try {
      const cancelledRequests = await BloodRequest.find({ status: "cancelled" });

      for (let request of cancelledRequests) {
        const { _id: bloodRequestId, bloodType, city } = request;

        const activeNotifs = await Notification.find({
          bloodRequestId,
          status: "active"
        });

        if (activeNotifs.length === 0) continue;

        const cancelMessage = `The blood request for ${bloodType} in ${city} has been cancelled. Thank you for your willingness to help. We hope you'll stay available for future opportunities.`;

        await Notification.updateMany(
          {
            bloodRequestId,
            status: "active",
          },
          {
            $set: {
              status: "cancelled",
              type: "info",
              message: cancelMessage,
            },
          }
        );

        console.log(`Cancelled notifications for blood request ${bloodRequestId}`);
      }
    } catch (error) {
      console.error("Error in cron job (cancelled request notification):", error);
    }
  });
}


export {
  cancelCancelledRequestNotifications,
  pendingAcceptedBloodRequestCancellation,
  pendingFormsCancellation,
  startCronJob,
};
