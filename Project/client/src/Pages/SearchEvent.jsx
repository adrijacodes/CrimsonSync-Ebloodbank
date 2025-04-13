import React, { useState } from 'react';

const SearchEvent = () => {
  const [city, setCity] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [newEvent, setNewEvent] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const handleSearch = () => {
    if (city.trim()) {
      setSearchResult(`📍 Showing events in ${city}...`);
    } else {
      setSearchResult(null);
    }
  };

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 3000);
      setNewEvent('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 font-serif">
        Find Events nearby!!!
      </h1>

      {/* Search by City */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Search by City</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        {searchResult && <p className="mt-3 text-green-600">{searchResult}</p>}
      </div>

      {/* Add New Event */}
      <div className="mt-10 pt-6 border-t">
        <h2 className="text-xl font-semibold mb-2">Add New Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
        {addSuccess && (
          <p className="mt-3 text-green-600">✅ Event added successfully!</p>
        )}
      </div>
    </div>
  );
};

export default SearchEvent;
