import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-red-600 shadow-md">
  <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
    {/* Left-aligned title */}
    <Link to='/' className="flex-1">
      <h1 className="font-bold text:sm sm:text-xl flex flex-wrap">
        <span className="text-white text-2xl">Crimson</span>
        <span className="text-white text-2xl">Sync</span>
        
      </h1>
    </Link>

    {/* Centered navigation links */}
    <nav className="flex-1">
      <ul className='flex justify-center text-white font-semibold font-sans'>
        <Link to='/'>
          <li className='px-4 hover:underline'>Home</li>
        </Link>
        <Link to='/About'>
          <li className='px-4 hover:underline'>About</li>
        </Link>
        <Link to='/register'>
          <li className='px-4 hover:underline'>Register</li>
        </Link>

      </ul>
    </nav>

    


    <div className="flex-1"></div>
  </div>
</header>

  );
};

export default Navbar;