import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//import PC1 from '../../assets/EventphotoCards/PC1.jpg';
import ImageList from '../../Helpers/ImageList';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { venue, city } = event.location || {};
  //const { _id: eventId, eventName } = event;



  if (!event) {
    return <div>Loading...</div>; // Fallback while event data is being loaded
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate("/event/" + event._id)}
    >
      <img
        src={ImageList}
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

// ✅ Add prop validation
EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.shape({
      venue: PropTypes.string,
      city: PropTypes.string,
    }),
  }).isRequired,
};

export default EventCard;
