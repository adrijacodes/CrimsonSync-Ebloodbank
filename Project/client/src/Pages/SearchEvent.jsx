import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockEvents = [
  {
    id: 1,
    name: 'Blood Donation Camp',
    city: 'Delhi',
    date: '2025-04-20',
    location: 'AIIMS Hospital',
  },
  {
    id: 2,
    name: 'Health Awareness Walk',
    city: 'Mumbai',
    date: '2025-04-25',
    location: 'Marine Drive',
  },
  {
    id: 3,
    name: 'Plasma Donation Drive',
    city: 'Delhi',
    date: '2025-04-22',
    location: 'Red Cross Center',
  },
  {
    id: 4,
    name: 'Free Health Checkup Camp',
    city: 'Chennai',
    date: '2025-04-30',
    location: 'Apollo Hospital',
  },
];

const SearchEvent = () => {
  const [city, setCity] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) {
      const results = mockEvents.filter(
        (event) => event.city.toLowerCase() === city.trim().toLowerCase()
      );

      setSearchResult(results.length ? results : []);
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-200 px-4">
      <div className="max-w-xl w-full p-6 bg-white bg-opacity-50 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 font-serif">
          Find Events Nearby!!!
        </h1>

        {/* Search by City */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold font-serif">Search by City</h2>
            <button
              onClick={() => navigate('/NewEvent')}
              className="bg-green-600 text-white px-4 py-2 rounded-full text-lg font-serif"
            >
              + Add Event
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-full mb-2"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-serif w-full"
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="mt-6">
            {searchResult.length ? (
              <>
                <p className="text-green-600 font-semibold mb-3">
                  📍 Showing events in {city}:
                </p>
                <ul className="space-y-4">
                  {searchResult.map((event) => (
                    <li
                      key={event.id}
                      className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                    >
                      <h3 className="text-lg font-bold text-red-700">
                        {event.name}
                      </h3>
                      <p className="text-sm">📅 {event.date}</p>
                      <p className="text-sm">📍 {event.location}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-red-600">❌ No events found in {city}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchEvent;
