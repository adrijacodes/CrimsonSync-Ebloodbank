import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../Components/Event Card/EventCard';

const SearchEvent = () => {
  const [city, setCity] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (city.trim()) {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8001/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: city.trim() }),
        });

        const data = await res.json();
        const events = data.events || data.data || [];
        setSearchResult(events);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResult([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-serif">
            Search Blood Donation Events Nearby!
          </h1>
          <button
            onClick={() => navigate('/NewEvent')}
            className="bg-white text-black px-4 py-2 text-xl rounded-full font-serif border border-gray-300 hover:bg-gray-100"
          >
            + Add Event
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white px-6 py-3 text-xl rounded-full font-serif hover:bg-red-700 transition"
          >
            Search
          </button>
        </div>

        {/* Results Section */}
        {loading ? (
          <p className="text-gray-500 font-serif">🔄 Searching events...</p>
        ) : searchResult !== null ? (
          <div>
            {searchResult.length ? (
              <>
                <p className="text-gray-700 font-medium mb-4 font-serif">
                  📍 Showing events in <span className="font-bold">{city}</span>:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-serif">
                  {searchResult.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-red-600 font-medium font-serif">
                ❌ No events found in "{city}"
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchEvent;
