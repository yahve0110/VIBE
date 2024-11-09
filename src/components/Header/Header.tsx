import React from "react";
import logo2 from "@/imgs/logo2.png"
import Image from "next/image";

export const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-sky-500 to-sky-300  px-8 p-4 ">
      <div className="absolute -top-20">
      <Image src={logo2} alt="logo" width={300} height={300} quality={100} />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-[50%]">
          <p className="text-4xl text-white  mb-4">Find Your Dream Job Today</p>

          <div className="bg-white w-full p-2 rounded-md gap-4 flex items-center mb-8 min-w-[800px]">
            <div className="flex w-full items-center">
              <input
                placeholder="Job title or keyword"
                className="w-full text-black outline-none p-2 rounded-l-md flex-grow"
                type="text"
              />
              <button className="bg-blue-500 p-2 rounded-r-md w-2/10">
                Search
              </button>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};
