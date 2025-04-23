import User from "../models/userModel.js";
import AsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Helper function to get today's day
const getTodayDay = () => {
  const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const today = new Date();
  return days[today.getDay()];
};

// Helper function to extract donor IDs
const getdonorIDs = (donors) => {
  return donors.map((donor) => donor._id);
};

// Random item selection and removal
const getRandomItemAndRemove = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomIndex];
  arr.splice(randomIndex, 1);
  return randomItem;
};

// Simulated function X for testing
const functionX = () => {
  return 0.2 > 0.5;  // For testing purposes: returns true or false
};

export const searchdonors = AsyncHandler(async (req, res, next) => {
  const { city, bloodType } = req.query;

  // Validate input
  if (!city || !bloodType) {
    throw ApiError(400, "City and BloodType are required!");
  }

  const today = getTodayDay();

  // Query to find donors based on city, bloodType, and today's availability
  const searchQuery = {
    "location.city": city,
    bloodType: bloodType,
    isDonor: true,
    availability: { $in: [today] },
  };

  // Fetch available donors
  const availableDonors = await User.find(searchQuery);

  if (availableDonors.length === 0) {
    return res.status(404).json(new ApiResponse({}, "No Donors found!", true));
  }

  // Prepare the donor list (just the IDs for now)
  let donorList = getdonorIDs(availableDonors);
  console.log("Initial Available Donors: ", donorList);  // Log the initial list of available donors

  const attemptDonorSelection = () => {
    if (donorList.length === 0) {
      console.log("No donors left to attempt. Exiting.");  // Log when all donors are exhausted
      return res.status(404).json(new ApiResponse({}, "No available donors after attempts.", true));
    }

    // Select a random donor
    const selectedDonor = getRandomItemAndRemove(donorList);
    console.log(`Picked Donor: ${selectedDonor}`);  // Log which donor was selected

    // Log the remaining donor list
    console.log("Remaining Donors: ", donorList);

    // Start a 5-millisecond timer to check if the donor is available
    const timer = setTimeout(() => {
      if (!functionX()) {
        console.log(`Donor ${selectedDonor} failed. Trying another one.`);  // Log when a donor fails
        attemptDonorSelection();  // Retry with the next donor
      } else {
        console.log(`Donor ${selectedDonor} selected successfully.`);  // Log when a donor is successfully selected
        clearTimeout(timer); // Clear the timer once donor is selected

        // Send the response
        return res.status(200).json({
          success: true,
          data: selectedDonor,
        });
      }
    }, 5); // Timer set to 5 milliseconds
  };

  // Start attempting to select a donor
  console.log("Attempting to select a donor...");
  attemptDonorSelection();
});
