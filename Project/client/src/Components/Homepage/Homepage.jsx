
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Title and Intro */}
      <h1 className="text-6xl text-center font-bold text-red-600 mb-6">Welcome to CrimsonSync</h1>
      <p className="text-center text-3xl font-semibold mb-8">Join the heartbeat of change—find donors, give blood,save lives.</p>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4">
        {/* Link to Find Donor page */}
        <Link to="/finddonor">
          <button className="px-6 py-6 bg-slate-400 text-white text-2xl font-semibold rounded-full hover:bg-red-600">
            Find Donor
          </button>
        </Link>

        {/* Link to Donate Blood page */}
        <Link to="/donateblood">
          <button className="px-6 py-6 bg-slate-400 text-white text-2xl font-semibold rounded-full hover:bg-red-600">
            Donate Blood
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
