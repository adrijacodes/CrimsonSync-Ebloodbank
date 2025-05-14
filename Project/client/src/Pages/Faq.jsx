import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: "Who can donate blood?",
    answer: "Anyone aged 18–65, weighing over 50kg, and in good health can donate blood."
  },
  {
    question: "How often can I donate blood?",
    answer: "You can donate whole blood once every 3 months for men and every 4 months for women."
  },
  {
    question: "Is blood donation safe?",
    answer: "Yes, it’s completely safe. Sterile equipment is used for each donation."
  },
  {
    question: "Will I feel weak after donating?",
    answer: "Most people feel fine. You may rest and have fluids/snacks after donating to feel normal."
  },
  {
    question: "Can I donate if I have a tattoo?",
    answer: "Yes, if the tattoo was done more than 6 months ago and under hygienic conditions."
  },
  {
    question: "How do I request blood on the platform?",
    answer: "Go to the 'Search Donor' page, filter by blood type and urgency, and submit your request."
  },
  {
    question: "Can I become a donor after requesting blood?",
    answer: "Yes, you can update your profile later and register as a donor if eligible."
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes, we strictly follow data privacy policies and never share your personal details without consent."
  },
  {
    question: "What should I do before donating blood?",
    answer: "Eat a healthy meal, stay hydrated, and avoid alcohol or heavy exercise before donating."
  },
  {
    question: "How will I be notified if someone accepts my request?",
    answer: "You will receive an in-app notification or email once a donor accepts your request."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold font-serif mb-6 text-center text-red-600">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-xl shadow-md transition-all duration-300 ${
                isOpen ? 'bg-red-50 border-red-400' : 'bg-white border-gray-300'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left font-medium text-lg p-4 hover:bg-red-100 rounded-t-xl transition-colors duration-200"
              >
                <span className="text-red-700">{faq.question}</span>
                <span
                  className={`text-red-600 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <div
                className={`px-4 pb-4 text-gray-700 text-base overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
