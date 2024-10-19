import Event from "../src/models/eventModel.js";

export const events = async (req, res, next) => {
  const { city } = req.body;
  try {
    const eventsList = await Event.find({ city });
    if (eventsList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Blood Donation Camps found!",
      });
    }
    res.status(200).json({
      success: true,
      data: eventsList,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
