import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { BiDonateBlood } from "react-icons/bi";
import woman from "../../assets/woman.png";
import man from "../../assets/man.png";
import human from "../../assets/human.png";
import pedro from "../../assets/Pedro.jpg";
import mona from "../../assets/mona.jpeg";
import sofia from "../../assets/sofia.jpg";
import joe from "../../assets/joe.jpeg";
import millie from "../../assets/millie.jpg";
import namita from "../../assets/namita.jpg";
const testimonials = [
  {
    text: "CrimsonSync made it so easy to find a donor in an emergency. I am forever grateful for this platform.",
    author: "Pedro Pascal",
    avatar: pedro,
    stars: 5,
  },
  {
    text: "Donating blood has never been simpler. The community here is amazing and supportive.",
    author: "Millie Bobby Brown",
    avatar: millie,
    stars: 4,
  },
  {
    text: "I appreciate the efforts of CrimsonSync. It's a lifeline for so many people.",
    author: "Penn Dayton Badgley ",
    avatar: joe,
    stars: 5,
  },
  {
    text: "The interface is clean, and I was able to get help within minutes. Highly recommend it to everyone.",
    author: "Sofia Carson",
    avatar:
      sofia,
    stars: 4,
  },
  {
    text: "This platform helped us during a crisis when we had no other option. Thank you for building this!",
    author: "Mona Patel",
    avatar:
      mona,
    stars: 5,
  },
  {
    text: "Volunteering as a donor on CrimsonSync is fulfilling. You truly feel part of something bigger.",
    author: "Namita Thapar ",
    avatar:
     namita,
    stars: 5,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("blood");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white p-5">
      <h1 className="text-6xl text-center font-bold">
        <span className="text-red-600 font-serif">Welcome to CrimsonSync</span>
      </h1>
      <p className="text-center text-3xl font-semibold mb-8 font-serif">
        Join the heartbeat of change—find donors, give blood, save lives.
      </p>

      {/* Stats Section */}
      <motion.div
        className="bg-white py-8 px-4 rounded-lg mb-10 cursor-pointer"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl text-center font-bold font-serif mb-6">
          Our Impact
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            { label: "Lives Saved", value: 10000 },
            { label: "Active Donors", value: 5000 },
            { label: "Donation Drives", value: 1000 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-start justify-center bg-red-600 rounded-xl p-6 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-5xl text-white">
                <CountUp end={stat.value} duration={2.5} separator="," />+
              </h3>
              <p className="text-xl text-yellow-400 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tab Section */}
      <div className="py-11 px-6">
        <div className="flex gap-12 justify-center mb-6">
          <Link to="/SearchBlood">
            <button
              className={`flex items-center gap-2 px-10 py-6 rounded-full text-2xl font-itim transition ${
                activeTab === "blood"
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg font-serif"
                  : "bg-gray-200 text-gray-800 font-serif"
              }`}
              onClick={() => setActiveTab("blood")}
            >
              <BiDonateBlood className="text-3xl" />
              Search Blood
            </button>
          </Link>
          <button
            className={`flex items-center gap-2 px-10 py-6 rounded-full text-2xl font-itim transition ${
              activeTab === "event"
                ? "bg-red-600 text-white shadow-lg font-serif"
                : "bg-gray-100 hover:bg-gray-300 shadow-lg  text-gray-800 font-serif"
            }`}
            onClick={() => {
              setActiveTab("event");
              navigate("/SearchEvent");
            }}
          >
            <SlMagnifier className="text-2xl" />
            Search Event
          </button>
        </div>
      </div>

      {/* Review Carousel */}
      <motion.div
        className="py-16 px-4 bg-gradient-to-b from-white to-red-50"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-4xl text-center font-extrabold font-serif mb-12 text-gray-800">
          ❤️ What Our Users Say
        </h2>

        <div className="relative flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white/80 backdrop-blur-md w-full max-w-3xl p-8 rounded-2xl shadow-xl text-center border border-red-100"
            >
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].author}
                  className="w-24 h-24 rounded-full mb-6 shadow-lg border-4 border-white"
                />
                <p className="text-xl italic mb-4 text-gray-700 max-w-xl mx-auto leading-relaxed">
                  “{testimonials[currentSlide].text}”
                </p>
                <p className="mt-3 font-semibold text-red-600 text-lg">
                  — {testimonials[currentSlide].author}
                </p>
                <div className="text-yellow-400 text-2xl mt-2">
                  {"★".repeat(testimonials[currentSlide].stars)}
                  {"☆".repeat(5 - testimonials[currentSlide].stars)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Optional: Dot Indicators for Slides */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-red-600 w-4" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </motion.div>

      {/* Developer Carousel / About the Creators */}
      <motion.div
        className="py-10 px-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-4xl text-center font-bold font-serif mb-8">
          Meet the Creators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
          {[
            {
              name: "Aindrila Dutta",
              role: "Backend & API Developer",
              image: woman,
              vision:
                "By designing efficient APIs and optimizing server-side processes, we ensure that CrimsonSync operates smoothly, even during peak demand, helping save lives when it matters most.",
            },
            {
              name: "Adrija Gowri",
              role: "Lead Frontend Developer",
              image: human,
              vision:
                "Building responsive and engaging interfaces that empower users to connect quickly and easily, saving lives when it matters the most.",
            },
            {
              name: "Debjit Dey",
              role: "Frontend Developer",
              image: man,
              vision:
                "Creating intuitive and seamless user experiences to ensure that every interaction with CrimsonSync is as impactful as the lives we aim to save.",
            },
          ].map((dev, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-100 rounded-xl shadow-md p-6 text-center"
              variants={itemVariants}
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-2xl font-bold text-red-600">{dev.name}</h3>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {dev.role}
              </p>
              <p className="italic text-gray-700">"{dev.vision}"</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
