import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <h1 className="text-6xl text-center font-bold">
        <span className="text-red-600">Welcome to </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-white animate-blood-flow">
          CrimsonSync
        </span>
      </h1>
      <p className="text-center text-3xl font-semibold mb-8 font-Alkatra">
        Join the heartbeat of change—find donors, give blood, save lives.
      </p>

      {/* Stats Section */}
      <motion.div
        className="bg-white py-8 px-4 rounded-lg  mb-10 cursor-pointer"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl text-center font-bold font-Itim mb-6">Our Impact</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div className=" flex flex-col items-start justify-center bg-red-600 rounded-xl p-6 shadow-lg  " variants={itemVariants}>
            <h3 className="text-5xl text-white font-Itim">10,000+</h3>
            <p className="text-xl text-yellow-400 font-semibold font-Itim">Lives Saved</p>
          </motion.div>
          <motion.div className="flex flex-col items-start justify-center bg-red-600 rounded-lg p-6 shadow-lg " variants={itemVariants}>
            <h3 className="text-5xl text-white font-Itim">5,000+</h3>
            <p className="text-xl text-yellow-400 font-semibold font-Itim">Active Donors</p>
          </motion.div>
          <motion.div className=" flex flex-col items-start justify-center bg-red-600 rounded-lg p-6 shadow-lg " variants={itemVariants}>
            <h3 className="text-5xl text-white font-Itim">1,000+</h3>
            <p className="text-xl text-yellow-400 font-semibold font-Itim">Donation Drives</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        className="py-8 px-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-4xl text-center font-bold font-Itim mb-6">What Our Users Say</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.3 }}
        >
          {/* Review 1 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <p className="text-lg italic ">
              "CrimsonSync made it so easy to find a donor in an emergency. I am
              forever grateful for this platform."
            </p>
            <p className="mt-4 font-semibold text-right">- Raj Tripathy</p>
          </motion.div>
          {/* Review 2 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <p className="text-lg italic">
              "Donating blood has never been simpler. The community here is
              amazing and supportive."
            </p>
            <p className="mt-4 font-semibold text-right">- Ajoy Sen</p>
          </motion.div>
          {/* Review 3 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <p className="text-lg italic">
              "I appreciate the efforts of CrimsonSync. It's a lifeline for so
              many people."
            </p>
            <p className="mt-4 font-semibold text-right">- Soumili Das</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
