import { Link } from 'react-router-dom';
import { BsCalendarEvent } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  return (
    <header className="bg-red-600 shadow-md">
  <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
    {/* Left-aligned title */}
    <Link to='/' className="flex-1">
      <h1 className="font-bold text:sm sm:text-xl flex flex-wrap">
        <span className="text-white text-3xl font-Alkatra">Crimson</span>
        <span className="text-white text-3xl font-Alkatra">Sync</span>
      </h1>
    </Link>

    {/* Centered navigation links */}
    <nav className="flex-1">
      <ul className='flex justify-center text-white font-Itim text-xl'>
        <Link to='/'>
          <li className='px-4 hover:underline'>Home</li>
        </Link>
        <Link to='/finddonor'>
          <li className='px-4 hover:underline'>Find Donor</li>
        </Link>
        <Link to='/about'>
          <li className='px-4 hover:underline'>About</li>
        </Link>
        <Link to='/register'>
          <li className='px-4 hover:underline'>Register</li>
        </Link>
      </ul>
    </nav>

    <div className="flex items-center space-x-4  ml-auto">
          <Link to="/events" className="text-white hover:text-red-300">
            <BsCalendarEvent className="text-2xl" />
          </Link>
          <Link to="/profile" className="text-white hover:text-red-300">
            <CgProfile className="text-2xl" />
          </Link>
        </div>


    <div className="flex-1"></div>
  </div>
</header>

  );
};

export default Navbar;