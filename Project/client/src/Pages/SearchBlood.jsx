import React, {useState} from 'react';

const SearchBlood = () => {
    const [location, setLocation] = useState("");
    const [activeTab, setActiveTab] = useState('type');

  return (
    <div className="min-h-screen bg-contain bg-center" style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
      <div className="flex items-center justify-center h-[100vh]">
        <form className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50">
        
        <div className="mb-4">
          <label className="block mb-2 text-center text-xl font-serif">Choose Blood Type</label>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              
          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            A+
          </button>

          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            A-
          </button>

          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            B+
          </button>

          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            B-
          </button>

          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            AB+
          </button>

          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            AB-
          </button>

          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            O+
          </button>

          <button
            className={`flex items-center p-2 bg-red-500 rounded cursor-pointer ${
              activeTab === 'type'
                ? 'bg-red-600 text-white shadow-lg font-serif'
                : 'bg-gray-200 text-gray-800 font-serif'
            }`}
            onClick={() => setActiveTab('type')}
          >
            O-
          </button>

                 </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-center text-xl font-serif">Location</label>
          <input
      type="text"
      placeholder="Enter the Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-300"
    />

        </div>

        <button type="submit" className="bg-red-500 text-white w-full py-2 rounded">
          Search Donor
        </button>
      </form>
    </div>
    </div>
  );
};

export default SearchBlood;
