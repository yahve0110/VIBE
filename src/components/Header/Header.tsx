import React from "react";
import InfoBlock from "../InfoBlock/InfoBlock";

export const Header = () => {
  return (
    <div className="w-full bg-indigo-600  px-8 p-4">
      <h1 className="text-5xl absolute text-white font-semibold tracking-wide 	">
        VIBE
      </h1>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-[50%]">
          <p className="text-4xl text-white  mb-4">Find Your Dream Job Today</p>

          <div className="bg-white w-full p-4 rounded-md flex justify-between items-center mb-8 min-w-[800px]">
            <div>
              <input placeholder="Job title or keyword" type="text" />
            </div>
            <button className="bg-blue-500 p-1">Search</button>
          </div>
        </div>
        <div className="flex absolute justify-center gap-16 top-40 z-30">
          <InfoBlock>Active Jobs</InfoBlock>
          <InfoBlock>Companies</InfoBlock>
          <InfoBlock>Job Seekers</InfoBlock>
        </div>
      </div>
    </div>
  );
};
