"use client";
import { Annoyed, Frown, Smile } from "lucide-react";
import React, { useState, useEffect } from "react";

const page = () => {
  // State to manage the visibility of smiley buttons
  const [clicked, setClicked] = useState<null | "smile" | "annoyed" | "frown">(
    null
  );

  // State to manage the text on the buttons after voting
  const [voted, setVoted] = useState(false);

  // Function to handle clicking on a smiley
  const handleClick = (emotion: "smile" | "annoyed" | "frown") => {
    setClicked(emotion);
    localStorage.setItem("userFeedback", emotion); // Store feedback in localStorage
    setVoted(true); // Change the state to show buttons after voting
  };

  // Function to reset the state and allow for re-voting
  const handleReVote = () => {
    setClicked(null);
    setVoted(false);
    localStorage.removeItem("userFeedback"); // Clear feedback from localStorage
  };

  // Effect to handle initial load and check if user feedback is saved in localStorage
  useEffect(() => {
    const savedFeedback = localStorage.getItem("userFeedback");
    if (savedFeedback) {
      setClicked(savedFeedback as "smile" | "annoyed" | "frown");
      setVoted(true);
    }
  }, []);

  return (
    <div className="mt-4 flex h-[700px] justify-center w-full">
      <div className="flex gap-12">
        <div className="text-black">
          <p className="text-[104px]">
            HOW WAS <br /> YOUR <span className="text-sky-500">DAY</span> ?
          </p>
          <div className="text-[36px] max-w-[600px]">
            Your <span className="text-sky-500">anonymous feedback</span> will
            help other users to make a better impression of the company
            environment.
          </div>
          <div>Only employees can vote</div>
          <div></div>
        </div>
        <div className="flex flex-col gap-5">
          {/* Smiley Buttons */}
          <div
            className={`bg-sky-500 w-60 h-60 rounded-md flex justify-center items-center cursor-pointer ${
              clicked === "smile" ? "opacity-50" : ""
            }`}
            onClick={() => handleClick("smile")}
          >
            <Smile className="w-32 h-32 text-green-400" />
          </div>

          <div
            className={`bg-sky-500 w-60 h-60 rounded-md relative flex justify-center items-center left-80 bottom-14 cursor-pointer ${
              clicked === "annoyed" ? "opacity-50" : ""
            }`}
            onClick={() => handleClick("annoyed")}
          >
            <Annoyed className="w-32 h-32 text-yellow-400" />
          </div>

          <div
            className={`bg-sky-500 w-60 h-60 rounded-md relative bottom-24 flex justify-center items-center cursor-pointer ${
              clicked === "frown" ? "opacity-50" : ""
            }`}
            onClick={() => handleClick("frown")}
          >
            <Frown className="w-32 h-32 text-red-600" />
          </div>

          {/* Submit or Re-vote Buttons */}
          {voted ? (
            <div className="mt-6 flex gap-4">
              <button
                className="bg-green-500 p-2 text-white rounded-md cursor-pointer"
                onClick={handleReVote}
              >
                Re-vote
              </button>
              <button
                className="bg-blue-500 p-2 text-white rounded-md cursor-pointer"
                onClick={() => alert("Feedback submitted!")}
              >
                Submit Feedback
              </button>
            </div>
          ) : (
            <p className="mt-4 text-lg text-gray-700">
              Please select an option to provide feedback.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
