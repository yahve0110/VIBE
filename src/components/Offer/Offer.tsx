import React from "react";
import {
  Annoyed,
  BriefcaseBusiness,
  Frown,
  Hotel,
  MapPin,
  Smile,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Define the types for the props
interface OfferProps {
  jobTitle: string;
  company: string;
  jobType: string;
  seniority: string;
  remote: boolean;
  percentages: {
    frown: number;
    annoyed: number;
    smile: number;
  };
}

const Offer: React.FC<OfferProps> = ({
  jobTitle,
  company,
  jobType,
  seniority,
  remote,
  percentages,
}) => {
  return (
    <div className="border-2 text-black h-full p-5 rounded-md w-full">
      <div className="flex gap-8 items-start">
        <div className="p-4 flex justify-self-center items-start bg-gray-200 rounded-md">
          <Hotel className="text-black" />
        </div>
        <div className="flex flex-col mb-8">
          <h3 className="text-2xl mb-2">{jobTitle}</h3>
          <p>{company}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between p-4 items-center">
        <div className="flex justify-center gap-4 mt-2 text-gray-400">
          <div className="flex gap-2">
            <MapPin /> {remote ? "Remote" : "On-site"}
          </div>
          <div className="flex gap-2">
            <BriefcaseBusiness /> {jobType}
          </div>
          <div className="flex gap-2">
            <TrendingUp /> {seniority}
          </div>
        </div>

        <div className="flex gap-12 items-center">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <Frown className="w-7 h-7 text-red-700 mr-1" />
              <p className="text-xs text-center">{percentages.frown}%</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Annoyed className="w-7 h-7 text-yellow-500 mr-1" />
              <p className="text-xs text-center">{percentages.annoyed}%</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Smile className="w-7 h-7 text-green-600 mr-1" />
              <p className="text-xs text-center">{percentages.smile}%</p>
            </div>
          </div>

          <Link href={"/survey"} className="bg-black cursor-pointer text-white  p-2 rounded-md items-end">
            Apply now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;
