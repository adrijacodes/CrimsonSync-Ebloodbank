import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { venue, city } = event.location || {}; // Destructure safely

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/event/${event._id}`)} // Changed to _id if that's your actual key
    >
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-red-700">{event.name}</h3>
        <p className="text-sm text-gray-600 mt-1">📅 {event.date}</p>
        <p className="text-sm text-gray-600">
          📍 {venue}, {city}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
