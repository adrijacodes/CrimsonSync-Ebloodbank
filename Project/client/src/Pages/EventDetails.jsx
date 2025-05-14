import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import randomIndexMultiple from "../Helpers/randomIndexMultiple.jsx";
import { FiCalendar, FiClock, FiMapPin, FiArrowLeft } from "react-icons/fi";

const EventDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.event) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 text-lg">
          Event data not found. Please go back to the homepage.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-md shadow"
        >
          <FiArrowLeft className="inline mr-2" /> Go Back
        </button>
      </div>
    );
  }

  const { event } = state;
  const { eventName, date, time, description, location } = event;
  const randomEventImages = randomIndexMultiple(3);

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden mt-12"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Featured Image */}
      {/* Image Gallery */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {randomEventImages.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Event Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-xl shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="p-8 space-y-6">
        <motion.h1
          className="text-3xl sm:text-4xl font-semibold font-serif text-gray-900"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {eventName}
        </motion.h1>

        <div className="space-y-2 text-gray-700 font-serif text-lg">
          <motion.p
            className="flex items-center gap-2"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FiCalendar className="text-red-500" />
            {new Date(date).toLocaleDateString()}
          </motion.p>
          {time && (
            <motion.p
              className="flex items-center gap-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FiClock className="text-red-500" />
              {time}
            </motion.p>
          )}
          <motion.p
            className="flex items-center gap-2"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FiMapPin className="text-red-500" />
            {location?.venue}, {location?.city}
          </motion.p>
        </div>

        <motion.div
          className="text-gray-800 font-serif leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {description}
        </motion.div>

        <motion.button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-lg shadow"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <FiArrowLeft className="inline mr-2" /> Back to Home
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventDetails;
