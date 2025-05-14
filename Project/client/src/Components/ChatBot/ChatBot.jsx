import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import chatbotImage from "../../assets/chatbot.jpg";
import userImage from "../../assets/user.jpg";
import predefinedQuestions from "./predefinedQuestions.js";
import fuzzysort from "fuzzysort"; // npm install fuzzysort
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hey there 👋 How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true); // Start with minimized
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    handleBotResponse(input);
  };

  const handleBotResponse = async (userMessage) => {
    setIsTyping(true);

    const questionList = predefinedQuestions.map((q) => q.question);

    // Fuzzy match with predefined questions
    const result = fuzzysort.go(userMessage, questionList, {
      threshold: -1000, // filter out bad matches
    });

    // If a predefined match exists, respond with the corresponding answer
    if (result.length > 0 && result[0].score > -100) {
      const matchedQuestion = result[0].target;
      const matchedAnswer = predefinedQuestions.find(
        (q) => q.question === matchedQuestion
      )?.answer;

      const newMessages = [
        ...messages,
        { text: userMessage, sender: "user" },
        { text: "Typing...", sender: "bot" },
      ];
      setMessages(newMessages);

      setTimeout(() => {
        const updatedMessages = [
          ...newMessages.slice(0, -1),
          { text: matchedAnswer, sender: "bot" },
        ];
        setMessages(updatedMessages);
        setIsTyping(false);
      }, 1000);

      return;
    }

    // Check if the user's message is related to blood donation, requests, or nearby camps but not in the predefined list
    const bloodRelatedKeywords = [
      "blood request",
      "donate blood",
      "blood donation camps",
      "nearby blood camps",
      "blood type",
      "allergy",
      "donation event",
      "emergency blood request",
      "find blood donor",
      "blood donation near me",
      "how to donate blood",
      "blood donor registration",
      "blood bank locations",
      "urgent blood donation",
      "blood group",
      "blood donor camp",
      "blood donation events",
      "request blood near me",
      "blood request urgent",
      "donate blood near me",
      "what is crimsonsync",
      "blood donation process",
      "register as a blood donor",
      "make a blood request",
      "eligibility to donate blood",
      "minimum age to donate",
      "most needed blood types",
      "where to donate blood",
      "find donation camp near me",
      "organize a blood donation camp",
      "cost for donating blood",
      "donate blood with medical condition",
      "track blood donation history",
      "blood request response time",
      "request blood for someone else",
      "cancel blood request",
      "create an account",
      "update profile details",
      "delete my account",
      "register as donor and recipient",
      "view donation/request history",
      "notify blood request acceptance",
      "respond to blood request",
      "donor response issue",
      "verify genuine donor",
      "login issue",
      "donation history sync",
      "request failed error",
      "search events/camps",
    ];

    const isBloodRelated = bloodRelatedKeywords.some((keyword) =>
      userMessage.toLowerCase().includes(keyword)
    );

    if (isBloodRelated) {
      // Query Gemini API for response
      const headers = {
        "Content-Type": "application/json",
      };

      // Add instruction for concise, short, one-liner response
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Please provide a short, one-liner, to-the-point response for the following query related to blood donation or camps: "${userMessage}"`,
              },
            ],
          },
        ],
      };

      const geminiURL = import.meta.env.VITE_GEMINI_API_URL;

      setTimeout(async () => {
        try {
          const response = await axios.post(geminiURL, requestBody, {
            headers,
          });

          const botResponse =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I'm not sure how to respond to that.";

          const newMessages = [
            ...messages,
            { text: userMessage, sender: "user" },
            { text: "Typing...", sender: "bot" },
          ];
          setMessages(newMessages);

          setTimeout(() => {
            const updatedMessages = [
              ...newMessages.slice(0, -1),
              { text: botResponse, sender: "bot" },
            ];
            setMessages(updatedMessages);
            setIsTyping(false);
          }, 2000);
        } catch (error) {
          console.error("Error communicating with Gemini API:", error);
          const fallbackMessage =
            "Oops! Something went wrong. Please try again later.";

          const newMessages = [
            ...messages,
            { text: userMessage, sender: "user" },
            { text: "Typing...", sender: "bot" },
          ];
          setMessages(newMessages);

          setTimeout(() => {
            const updatedMessages = [
              ...newMessages.slice(0, -1),
              { text: fallbackMessage, sender: "bot" },
            ];
            setMessages(updatedMessages);
            setIsTyping(false);
          }, 2000);
        }
      }, 1000);
    } else {
      // If the question doesn't match any predefined list or isn't related to blood donation, requests, or camps
      const newMessages = [
        ...messages,
        { text: userMessage, sender: "user" },
        { text: "Typing...", sender: "bot" },
      ];
      setMessages(newMessages);

      setTimeout(() => {
        const updatedMessages = [
          ...newMessages.slice(0, -1),
          {
            text: "Sorry, I can only help with blood donation, requests, and nearby camps. Please ask questions related to those topics.",
            sender: "bot",
          },
        ];
        setMessages(updatedMessages);
        setIsTyping(false);
      }, 2000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 w-80 shadow-lg rounded-2xl overflow-hidden bg-white border-2 border-red-600">
      <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={chatbotImage}
            alt="Chatbot"
            className="h-8 w-8 rounded-full"
          />
          <h2 className="font-semibold text-lg">Mr. Bleed</h2>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-white hover:opacity-80"
        >
          {isMinimized ? (
            <div className="bg-gray-200 px-4 py-2 rounded-xl text-xl text-center">
              🗨️
            </div>
          ) : (
            "🗨️"
          )}
        </button>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="chat-body px-4 py-3 h-64 overflow-y-auto bg-red-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} // Smooth transition duration reduced
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 mb-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={chatbotImage}
                    alt="Bot"
                    className="h-7 w-7 rounded-full"
                  />
                )}
                <p
                  className={`px-3 py-2 rounded-xl max-w-[70%] text-sm ${
                    msg.sender === "bot"
                      ? "bg-white text-gray-800 border"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {msg.text}
                </p>
                {msg.sender === "user" && (
                  <img
                    src={userImage}
                    alt="User"
                    className="h-7 w-7 rounded-full"
                  />
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2 mb-3">
                <img
                  src={chatbotImage}
                  alt="Bot"
                  className="h-7 w-7 rounded-full"
                />
                <p className="px-3 py-2 rounded-xl max-w-[70%] text-sm bg-white text-gray-800 border">
                  Typing...
                </p>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMinimized && (
        <form onSubmit={handleSendMessage} className="p-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 text-white rounded-full px-4 py-2"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatBot;
