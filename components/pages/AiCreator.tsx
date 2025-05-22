import React, { useState } from "react";
import { BrainCircuit, Sparkles } from "lucide-react";

import "../account/team/swal.css"

const AiFormCreator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 9000);
  };

  const prompts = [
    {
      title: "Customer Feedback Survey",
      description:
        "Create a comprehensive survey that includes product satisfaction rating, delivery experience evaluation, customer service assessment, and open-ended feedback sections.",
      tag: "Business",
      tagColor: "bg-[#B8B1FF7A] text-[#474747]",
    },
    {
      title: "Employee Engagement Survey",
      description:
        "Design an anonymous employee engagement survey covering workplace satisfaction, management effectiveness, career development opportunities, work-life balance, and company culture. Include matrix questions for rating different aspects and comment sections for suggestions.",
      tag: "Employee",
      tagColor: "bg-[#BDFFB17A] text-[#474747]",
    },
    {
      title: "Event Registration Form",
      description:
        "Build a dynamic event registration form with attendee details, ticket selection, session preferences, dietary requirements, and accessibility needs. Include payment integration and automatic confirmation emails. Add logic to show/hide session options based on ticket type.",
      tag: "Event",
      tagColor: "bg-[#B1E5FF7A] text-[#474747]",
    },
  ];
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-almarai">
      <div className="bg-white w-[90%] max-w-5xl p-6 rounded-3xl shadow-lg flex gap-6">
        {/* Left Section */}
        <div className="relative w-1/2 text-center">
          {/* Back Button - Positioned Absolutely to the Left */}
          <button className="absolute top-0 left-0 flex items-center gap-2 px-2 py-3 transition border border-gray-300 rounded-lg text-[#6B7280] hover:text-black hover:border-black text-xs">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9993 20.6695C14.8093 20.6695 14.6193 20.5995 14.4693 20.4495L7.9493 13.9295C6.8893 12.8695 6.8893 11.1295 7.9493 10.0695L14.4693 3.54953C14.7593 3.25953 15.2393 3.25953 15.5293 3.54953C15.8193 3.83953 15.8193 4.31953 15.5293 4.60953L9.0093 11.1295C8.5293 11.6095 8.5293 12.3895 9.0093 12.8695L15.5293 19.3895C15.8193 19.6795 15.8193 20.1595 15.5293 20.4495C15.3793 20.5895 15.1893 20.6695 14.9993 20.6695Z"
                fill="#6B7280"
              />
            </svg>
            Back to the menu
          </button>

          {/* Title and Description */}
          <h1 className="mt-20 text-4xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 font-almarai ">
            Create your form with AI
          </h1>
          <p className="mt-10 text-gray-500">
            Describe your form and let AI create it for you
          </p>

          {/* AI Animation Placeholder */}
          <div className="flex items-center justify-center ">
            <div className="e-cercleAi">
              <div className="wave" />
              <div className="wave" />
              <div className="wave" />
            </div>

            {/* <img
              src="/src/images/Ai.png"
              alt="AI animation"
              className=" opacity-80"
            /> */}
          </div>

          {/* Subtitle */}
          <p className="mt-14 text-lg font-almarai text-[#2A2A2A]">
            Describe your form
          </p>
          <p className="text-sm text-[#83868E]">
            Select an example prompt above or write your own description
          </p>

          {/* Input & Generate Button */}
          {/* Input and Generate Button - Aligned */}
          <div className="flex items-center w-full max-w-lg gap-3 mt-8">
            <textarea
              placeholder="Enter your prompt here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 p-8 text-sm border border-[#D9D9D9] text-gray-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none overflow-hidden"
              style={{ minHeight: "40px", maxHeight: "200px" }}
              rows={1}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`px-6 py-4 text-white rounded-2xl shadow-md transition flex items-center justify-center ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  <span className="animate-pulse">AI is Thinking...</span>
                </div>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5 mr-2" /> Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-6 rounded-3xl bg-gray-50">
          <div className="flex flex-col items-end mb-4">
            <img
              src="/src/images/Votly-logo-colored 3.png"
              alt="Logo"
              className="h-6"
            />
            <h2 className="w-full mt-2 text-lg font-normal text-left text-[#474747]">
              Choose from our pre-made prompt
            </h2>
          </div>
          <div className="mt-4 space-y-4">
            {prompts.map((prompt, index) => (
              <div
                key={index}
                className="relative p-5 transition bg-white border border-gray-400 border-dashed shadow-sm cursor-pointer rounded-3xl hover:shadow-md "
              >
                {/* Tag Positioned Top Right */}
                <span
                  className={`absolute top-2 right-2 text-xs px-4 py-2 rounded-full ${prompt.tagColor}`}
                >
                  {prompt.tag}
                </span>
                <h3 className="font-light ">{prompt.title}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {prompt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* AI Generated Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
          <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg animate-slide-up">
            <Sparkles className="w-16 h-6 h-16 mx-auto mb-4 text-yellow-500 " />
            <h2 className="text-xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 animate-bounce">
              AI Generated Your Form !
            </h2>
            <p className="mt-1 text-gray-600">
              Your AI-powered form is now available.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 mt-3 text-white transition bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              See
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiFormCreator;
