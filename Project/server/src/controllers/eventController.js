import Event from "../models/eventModel.js";
import AsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Register a new event
export const registerEvents = AsyncHandler(async (req, res) => {
 
  const { eventName, date, description, location: { city, venue } } = req.body;

 
  const existingEvent = await Event.findOne({ eventName });
  if (existingEvent) {
    throw new ApiError(400, "Event already exists on this date");
  }

  // Create event details object
  const eventDetails = {
    eventName,
    description,
    date,
    location: {
      venue,
      city,
    },
  };

 
  const newEvent = await Event.create(eventDetails);
  if (!newEvent) throw new ApiError(500, "Error saving event to the database");

  res
    .status(201)
    .json(new ApiResponse(newEvent, "Event added successfully", true));
});


export const getEvents = AsyncHandler(async (req, res) => {
  const { city } = req.body; 
 console.log("entering");
  
 
  const eventsList = await Event.find({ "location.city": city });
  if (eventsList.length === 0) {
    return res
      .status(404)
      .json(
        new ApiResponse("", "No blood donation camps found!", false)
      );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        eventsList,
        "Nearby events returned successfully",
        true
      )
    );
});
