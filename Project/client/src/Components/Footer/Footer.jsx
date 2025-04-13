import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-white">CrimsonSync</h1>
          <p className="mt-2 text-sm">
            Connecting donors with those in need. Save lives, one drop at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:text-red-300">About Us</a></li>
            <li><a href="/events" className="hover:text-red-300">Events</a></li>
            <li><a href="/donate" className="hover:text-red-300">Become a Donor</a></li>
            <li><a href="/contact" className="hover:text-red-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className="text-sm">📍 123 Bloodline Street, LifeCity, IN</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ support@crimsonsync.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-red-300"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-red-300"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-red-300"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-red-300"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-red-700 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} CrimsonSync eBloodBank. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
