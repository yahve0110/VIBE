import React from "react";

const Offer = () => {
  return (
    <div className="border-2 text-black  h-full p-3 rounded-md w-full">
      <div className="flex flex-col mb-8">
        <h3 className="text-2xl mb-2">Senior Frontend Developer</h3>
        <p>TechCorp Inc.</p>
      </div>
      <hr />
      <div className="flex justify-between p-4 items-center">
      <div className="flex justify-center gap-4 mt-2 text-gray-400">
        <div>Remote</div>
        <div>Full-time</div>
        <div>Senior</div>
      </div>
 
        <button className="bg-black text-white p-2 rounded items-end">
          Apply now
        </button>
      </div>
    
    </div>
  );
};

export default Offer;
