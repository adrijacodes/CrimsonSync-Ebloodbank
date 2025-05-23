import React, { useState } from "react";
import EventCard from "../Components/Event Card/EventCard";

const SearchEvent = () => {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");

  const handleSearch = async () => {
    if (!city.trim()) {
      setSearchResult(null);
      setSearchedCity("");
      return;
    }

    const changedCity = city.toLowerCase().trim();
    setSearchedCity(changedCity);
    setLoading(true);
    setSearchResult(null);

    try {
      const apiUrl = `https://crimsonsync-ebloodbank.onrender.com/api/events/search?city=${encodeURIComponent(
        changedCity
      )}&filter=${category.toLowerCase()}`;

      const res = await fetch(apiUrl, {
        method: "GET",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSearchResult(data.data.eventsList || []);
      } else {
        console.error("Server responded with an error:", data.message);
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResult([]);
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-serif">
            View Blood Donation Events
          </h1>
        </div>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full sm:w-auto flex-1 p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Upcoming">Upcoming</option>
          </select>
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
                  📍 Showing events in{" "}
                  <span className="font-bold">{searchedCity}</span>:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-serif">
                  {searchResult.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-red-600 font-medium font-serif">
                ❌ No events found in &quot;{searchedCity}&quot;
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchEvent;
