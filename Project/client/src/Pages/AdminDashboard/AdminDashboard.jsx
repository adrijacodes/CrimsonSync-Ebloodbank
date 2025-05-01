import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showEventOptions, setShowEventOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  const bloodFacts = [
    { icon: "🩸", text: "One donation can save up to 3 lives." },
    { icon: "⏱️", text: "Every 2 seconds, someone needs blood." },
    { icon: "🚫🏭", text: "Blood cannot be manufactured — only donated." },
    { icon: "🅾️", text: "O-negative is the universal donor type." },
    { icon: "💪", text: "Regular donors tend to be healthier & live longer." },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bloodFacts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-h-screen py-10 px-4 bg-red-50"
      style={{
        backgroundImage: "url('/assets/Bg1.jpeg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.h1
        className="text-4xl text-center font-bold text-red-800 mb-12 font-serif"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        E-Blood Bank Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: 'Event Management',
            toggle: showEventOptions,
            setToggle: setShowEventOptions,
            buttons: [
              { text: '➕ Add Event', route: '/NewEvent' },
              { text: '📄 View Events', route: '/view-event' },
              { text: '🏙️ Events by City & Year', route: '/event-by-city-year' },
            ]
          },
          {
            title: 'User Management',
            toggle: showUserOptions,
            setToggle: setShowUserOptions,
            buttons: [
              { text: '👥 View Users', route: '/user-list' },
              { text: '🔍 Search User', route: '/Search-user' },
            ]
          },
          {
            title: 'Admin Management',
            toggle: showAdminOptions,
            setToggle: setShowAdminOptions,
            buttons: [
              { text: '🛡️ View Admins', route: '/View-admin' },
              { text: '🔍 Search Admin', route: '/Search-admin' },
            ]
          }
        ].map((section, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 border border-red-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <button
              onClick={() => section.setToggle(!section.toggle)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-xl font-semibold transition font-serif"
            >
              {section.title}
            </button>
            {section.toggle && (
              <div className="mt-4 flex flex-col gap-3">
                {section.buttons.map((btn, i) => (
                  <motion.button
                    key={i}
                    onClick={() => navigate(btn.route)}
                    className="bg-red-100 hover:bg-red-200 text-red-800 py-2 px-4 rounded-md text-base font-serif shadow-sm transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {btn.text}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 🔄 Rotating Blood Fact Slider */}
      <div className="mt-16 w-full flex justify-center items-center">
        <div className="w-full max-w-3xl bg-red-100 rounded-2xl shadow-md p-6 text-center border border-red-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-lg sm:text-xl font-serif text-red-800 italic flex justify-center items-center gap-2"
            >
              <span className="text-2xl">{bloodFacts[index].icon}</span>
              <span>{bloodFacts[index].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
