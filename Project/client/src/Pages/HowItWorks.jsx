import React from 'react';
import { motion } from 'framer-motion';
import collage from '../assets/collage.jpg';
import col2 from '../assets/col2.jpg';
const steps = [
  {
    title: "Step 1: Register or Log In",
    description: "Create an account or log in using your email or Google credentials to access the platform.",
    image: collage
  },
  {
    title: "Step 2: Submit a Request or Enable Donor Mode",
    description: "To request blood, fill out the blood request form. To donate, enable 'Donor Mode' in your profile and fill out the donor form.",
    image: "/images/form-fill.gif"
  },
  {
    title: "Step 3: Search for Donors or Blood Donation Events",
    description: "Requesters can search for available donors based on blood type and urgency. You can also find upcoming blood donation camps/events in your area.",
    image: col2
  },
  {
    title: "Step 4: Get Matched and Confirm Donation",
    description: "Once a potential donor or event is found, you will be automatically matched. Confirm your donation or request based on the availability.",
    image: "/images/match-donor.gif"
  }
];

const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold font-serif text-center mb-12 text-red-600">
        How It Works
      </h2>

      <div className="grid gap-10 md:grid-cols-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white shadow-xl rounded-xl p-6 border hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500 text-white font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-4">{step.description}</p>

            {step.image && (
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={step.image}
                alt={step.title}
                className="rounded-lg border shadow-sm transition duration-300"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
