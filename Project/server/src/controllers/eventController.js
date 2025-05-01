import Event from "../models/eventModel.js";
import AsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import moment from "moment-timezone";
import ApiError from "../utils/ApiError.js";

// Register a new event
export const registerEvents = AsyncHandler(async (req, res) => {
  const { eventName, date, description, city, venue } = req.body;

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
      venue: venue,
      city: city.toLowerCase(),
    },
  };

  const newEvent = await Event.create(eventDetails);
  if (!newEvent) throw new ApiError(500, "Error saving event to the database");

  res
    .status(201)
    .json(new ApiResponse(newEvent, "Event added successfully", true));
});

// Search event

export const getEvents = AsyncHandler(async (req, res) => {
  const { city, filter } = req.query;
  const isAdmin = req.user?.role === "admin";

  const query = { "location.city": city };

  const nowIST = moment.tz("Asia/Kolkata");

  if (filter === "today") {
    const istStart = nowIST.clone().startOf("day").toDate(); // Today 12:00 AM IST
    const istEnd = nowIST.clone().endOf("day").toDate();     // Today 11:59:59 PM IST

    query.date = {
      $gte: istStart,
      $lt: istEnd,
    };
  } else if (filter === "upcoming") {
    const tomorrowIST = nowIST.clone().add(1, "day").startOf("day").toDate(); // Tomorrow 12:00 AM IST

    query.date = {
      $gte: tomorrowIST,
    };
  } else if (filter === "expired") {
    if (!isAdmin) {
      return res
        .status(403)
        .json(
          new ApiResponse(
            null,
            "You are not authorized to view expired events.",
            false
          )
        );
    }

    const endOfYesterdayIST = nowIST.clone().subtract(1, "day").endOf("day").toDate(); // Yesterday 11:59:59 PM IST

    query.date = {
      $lte: endOfYesterdayIST,
    };
  } else {
    // Default: show events from current moment onward
    const currentIST = nowIST.toDate();

    query.date = {
      $gte: currentIST,
    };
  }

  console.log("Query being used:", query);

  const [count, eventsList] = await Promise.all([
    Event.countDocuments(query),
    Event.find(query),
  ]);

  if (eventsList.length === 0) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          null,
          "No events found based on your search criteria.",
          false
        )
      );
  }

  res.status(200).json(
    new ApiResponse(
      {
        totalresults: count,
        eventsList: eventsList,
      },
      "Events returned successfully based on your filter.",
      true
    )
  );
});

// City and Year Event report
export const getEventsGroupedByCityAndYear = AsyncHandler(async (req, res) => {
  const rawData = await Event.aggregate([
    {
      $project: {
        city: "$location.city",
        year: { $year: "$date" },
      },
    },
    {
      $group: {
        _id: { city: "$city", year: "$year" },
        totalEvents: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.city": 1,
        "_id.year": 1,
      },
    },
  ]);

  // Transforming to Recharts-friendly format
  const resultMap = {};

  rawData.forEach(({ _id, totalEvents }) => {
    const { city, year } = _id;
    if (!resultMap[city]) {
      resultMap[city] = { city };
    }
    resultMap[city][year] = totalEvents;
  });

  const formattedData = Object.values(resultMap);
  res.json(formattedData);
});
