import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { venue, city } = event.location || {}; // Destructure safely



  if (!event) {
    return <div>Loading...</div>; // Fallback while event data is being loaded
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate("/event/" + event._id)}
//      Navigate to detailed event page
    >
      {/* Ensure there's a fallback for image if it doesn't exist */}
      <img
        src={event.image || '/path/to/default-image.jpg'} // Provide a default image if no image exists
        alt={event.eventName || 'Event Image'}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-red-700">{event.eventName}</h3>
        <p className="text-sm text-gray-600 mt-1">📅 {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">
          📍 {venue}, {city}
        </p>
        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;