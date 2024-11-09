import React from "react";

const page = () => {
  return (
    <div className="mt-6 flex justify-center w-full px-16 overflow-y-auto max-h-[600px] text-semibold">
      <div className=" p-6 justify-center text-black w-[80%] h-[600px]  grid grid-cols-5 grid-rows-6  gap-4">
        <div className="row-span-4 shadow-xl p-6 rounded-md text-2xl">
          <div className="text-white grid grid-cols-2 gap-4 mb-2">
            <div className="flex flex-col gap-4">
              <button className="bg-sky-500 p-2 rounded">1</button>
              <button className="bg-sky-500 p-2 rounded">2</button>
              <button className="bg-sky-500 p-2 rounded">3</button>
            </div>
            <div className="flex flex-col gap-4">
              <button className="bg-sky-500 p-2 rounded">4</button>
              <button className="bg-sky-500 p-2 rounded">5</button>
            </div>
          </div>

          <div>
            I prefer to start my day by{" "}
            <span className="text-semibold">planning</span> my tasks
          </div>
          <div></div>
        </div>
        <div className="col-span-2 row-span-4 shadow-xl p-6 text-2xl">
          <p className="text-bold">
            You will need to answer several questions so we can match you with
          </p>
          <span className="text-sky-500"> best team possible</span>
          <div className="mt-6">
            The numbers will represent how you feel, where{" "}
            <span className="text-sky-500">5</span> is total agreement and{" "}
            <span className="text-sky-500">1</span> is total disagreement.
          </div>
        </div>
        <div className="col-span-2 row-span-3 col-start-4 bg-red-500">3</div>
        <div className="col-span-2 row-span-2 col-start-1 row-start-5 bg-gradient-to-r from-sky-500 to-blue-600 p-4 rounded-md text-white text-2xl ">
          <p> I easily get along with new people in a team</p>
          <div className="flex gap-4 text-black mt-2">
            <button className="bg-white flex justify-center p-2 rounded">
              1
            </button>
            <button className="bg-white  p-2 rounded">2</button>
            <button className="bg-white  p-2 rounded">3</button>
            <button className="bg-white  p-2 rounded">4</button>
            <button className="bg-white  p-2 rounded">5</button>
          </div>
        </div>
        <div className="row-span-2 col-start-3 row-start-5 shadow-xl p-4 text-2xl">
          <div></div>
          <p> I have no problem asking for help when I need it</p>
        </div>
        <div className="col-span-2 row-span-3 col-start-4 row-start-4 bg-red-500">
          6
        </div>
      </div>
    </div>
  );
};

export default page;
