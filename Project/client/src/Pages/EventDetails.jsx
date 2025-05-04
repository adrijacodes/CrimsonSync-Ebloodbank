import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import randomIndex from '../Helpers/randomIndex.jsx';

const EventDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

 // If no event data is passed (e.g., user visits the URL directly), show a fallback message
  if (!state?.event) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 text-lg">Event data not found. Please go back to the homepage.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-md shadow"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { event } = state;
  const { eventName, date, time, description, location } = event;
  // Get a random image using the randomIndex function This will return a random image from the list
  const randomEventImage = randomIndex(); 

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.img
        src={randomEventImage}
        alt="Event Banner"
        className="w-full h-64 object-cover rounded-xl mb-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      />

      <motion.h1
        className="text-4xl font-bold font-serif text-red-700 mb-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {eventName}
      </motion.h1>

      <motion.p
        className="text-gray-700 font-serif mb-2 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        📅 {new Date(date).toLocaleDateString()} {time && `at ${time}`}
      </motion.p>

      <motion.p
        className="text-gray-700 font-serif mb-2 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        📍 {location?.venue}, {location?.city}
      </motion.p>

      <motion.p
        className="text-gray-800 font-serif mt-4 text-base leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default EventDetails;
