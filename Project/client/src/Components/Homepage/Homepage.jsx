import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { Link, useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { BiDonateBlood } from "react-icons/bi";
import woman from "../../assets/woman.png"
import man from "../../assets/man.png"
import human from "../../assets/human.png"

const testimonials = [
  {
    text: "CrimsonSync made it so easy to find a donor in an emergency. I am forever grateful for this platform.",
    author: "Raj Tripathy",
    avatar:
      "https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=612x612&w=0&k=20&c=CncNUTbw6mzGsbojks2Vt0kV85N_pQaI3zaSkBQJFTc=",
    stars: 5,
  },
  {
    text: "Donating blood has never been simpler. The community here is amazing and supportive.",
    author: "Ajoy Sen",
    avatar:
      "https://t3.ftcdn.net/jpg/03/67/70/92/360_F_367709239_wWNdUSrtEvG6psATqu1sO9AkKUXALpR8.jpg",
    stars: 4,
  },
  {
    text: "I appreciate the efforts of CrimsonSync. It's a lifeline for so many people.",
    author: "Soumili Das",
    avatar:
      "https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A=",
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
                  ? "bg-red-600 text-white shadow-lg font-serif"
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
                : "bg-gray-200 text-gray-800 font-serif"
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
        className="py-10 px-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-4xl text-center font-bold font-serif mb-8">
          What Our Users Say
        </h2>
        <div className="relative flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg text-center"
            >
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].author}
                  className="w-20 h-20 rounded-full mb-4 shadow-md"
                />
                <p className="text-lg italic mb-2">{`"${testimonials[currentSlide].text}"`}</p>
                <p className="mt-2 font-semibold text-red-600">
                  - {testimonials[currentSlide].author}
                </p>
                <div className="text-yellow-400 text-xl mt-1">
                  {"★".repeat(testimonials[currentSlide].stars)}
                  {"☆".repeat(5 - testimonials[currentSlide].stars)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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
        vision: "By designing efficient APIs and optimizing server-side processes, we ensure that CrimsonSync operates smoothly, even during peak demand, helping save lives when it matters most."
      }
      ,
      {
        name: "Adrija Gowri",
        role: "Lead Frontend Developer",
        image:
          human,
        vision:
        "Building responsive and engaging interfaces that empower users to connect quickly and easily, saving lives when it matters the most."
      },
      {
        name: "Debjit Dey",
        role: "Frontend Developer",
        image:
          man,
        vision:
          "Creating intuitive and seamless user experiences to ensure that every interaction with CrimsonSync is as impactful as the lives we aim to save."
,
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
        <p className="text-sm font-medium text-gray-600 mb-2">{dev.role}</p>
        <p className="italic text-gray-700">"{dev.vision}"</p>
      </motion.div>
    ))}
  </div>
</motion.div>

    </div>
  );
};

export default HomePage;
