"use client";

import React, { useState } from "react";
import exampleImg from "@/imgs/example.jpg"
import Image from "next/image";

// Define the types for the server response
interface ServerResponse {
  prediction: {
    predicted_cluster: string;
    distance_to_centroid: number;
    average_distance_to_centroid: number;
    similarity: number;
    image_path:string;
  };
}

const questions = [
  "I prefer to start my working day by planning my tasks",
  "I am more comfortable learning from mentors than on my own",
  "I have no problems asking for help when I need it",
  "I easily get along with new people in a team",
  "It is important for me to receive regular feedback from my colleagues",
  "I value constructive criticism and willingly accept advice",
  "I enjoy studying new topics independently",
  "Working for a reputable company is important to me",
  "It’s important for me that colleagues support each other",
  "Work-life balance is a priority for me",
];

const Page = () => {
  // State to store the user's responses, with the index as the key and score as the value
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [serverResponse, setServerResponse] = useState<ServerResponse | null>(null);

  // Function to handle button click and set the response for each question
  const handleButtonClick = (questionIndex: number, score: number) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: score,
    }));
  };

  // Handle form submission and make the API request
  const handleSubmit = async () => {
    if (Object.keys(responses).length < questions.length) {
      setFeedback("Please answer all questions.");
      return;
    }

    setLoading(true);
    setFeedback(null);
    setServerResponse(null);

    const responseArray = Array.from(
      { length: questions.length },
      (_, i) => responses[i] || null
    );

    const payload = { features: responseArray };

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result: ServerResponse = await response.json();
        setServerResponse(result);
        setFeedback("Submission successful!");
      } else {
        setFeedback("Submission failed. Please try again.");
      }
    } catch (error) {
      setFeedback("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex justify-center w-full px-16 overflow-y-auto max-h-[600px] text-semibold">
      {!serverResponse && (
        <div className="flex flex-col w-[75%]">
          <div className="text-black flex flex-col mb-5 px-6">
            <h2 className="text-2xl">
              You'll need to answer several questions so we can match you with the
              <span className="text-sky-500"> best team possible</span>.
            </h2>
            <p className="text-xl mt-4">
              The numbers represent how you feel, where 5 is total agreement and 1 is total disagreement.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {questions.map((question, index) => (
              <div key={index} className="border p-8 rounded-xl w-full">
                <p className="text-2xl text-black">{question}</p>
                <div className="flex gap-4 mt-6">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleButtonClick(index, num)}
                      className={`w-12 h-12 rounded-md ${
                        responses[index] === num ? "bg-green-500" : "bg-sky-500"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 bg-sky-500 hover:bg-sky-700 w-[50%] text-white py-3 px-6 rounded-md text-lg"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          {feedback && (
            <p className="mt-4 text-center text-red-500">{feedback}</p>
          )}

          {loading && (
            <div className="mt-4 text-center">
              <p>Loading...</p>
              <div className="spinner border-t-4 border-blue-500 rounded-full w-8 h-8 mt-2 animate-spin"></div>
            </div>
          )}
        </div>
      )}

      {serverResponse && (
        <div className="mt-6 text-black p-6 rounded-md text-center flex justify-center flex-col items-center">
          <h3 className="text-2xl mb-4">!!! This prediction sees only employeer !!!</h3>
        

          <p className="text-4xl ">
            <strong>Similarity:</strong> {serverResponse.prediction.similarity}
          </p>
          <Image className="max-w-[50%] " src={serverResponse.prediction.image_path} alt="Example image" />
          <p>
            <strong>Predicted Cluster:</strong> {serverResponse.prediction.predicted_cluster}
          </p>

          <p>
            <strong>Distance to Centroid:</strong>
            {typeof serverResponse.prediction.distance_to_centroid === "number"
              ? serverResponse.prediction.distance_to_centroid.toFixed(4)
              : "N/A"}
          </p>

          <p>
            <strong>Average Distance to Centroid:</strong>
            {typeof serverResponse.prediction.average_distance_to_centroid === "number"
              ? serverResponse.prediction.average_distance_to_centroid.toFixed(4)
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
