import Sidebar from "@/components/Sidebar/Sidebar";
import Offer from "@/components/Offer/Offer";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import { BriefcaseBusiness, Hotel, UsersRound } from "lucide-react";

export default function Home() {
  return (
    <div className="mt-24 flex justify-center w-full">
      {/* Sidebar on the left with fixed width */}
      <div className="flex absolute justify-center gap-16 top-40 z-30">
        <InfoBlock>
          <div className="flex gap-6">
            <div className=" bg-blue-200 p-4 rounded-md flex justify-center items-center">
              <BriefcaseBusiness className="text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span>Active Jobs</span>
              <span className="text-4xl"> 2,534</span>
            </div>
          </div>
          <div></div>
        </InfoBlock>
        <InfoBlock>
          <div className="flex gap-6">
            <div className=" bg-green-200 p-4 rounded-md flex justify-center items-center">
              <Hotel className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span>Companies</span>
              <span className="text-4xl"> 2,534</span>
            </div>
          </div>
          <div></div>
        </InfoBlock>
        <InfoBlock>
          <div className="flex gap-6">
            <div className=" bg-fuchsia-200 p-4 rounded-md flex justify-center items-center">
              <UsersRound className="text-fuchsia-400 " />
            </div>
            <div className="flex flex-col">
              <span>Job Seekers</span>
              <span className="text-4xl"> 2,534</span>
            </div>
          </div>
          <div></div>
        </InfoBlock>
      </div>
      {/* Main Content Container */}
      <div className="flex-1 max-w-[1200px] mx-auto grid grid-cols-1 gap-4 p-4 overflow-y-auto max-h-[600px] custom-scrollbar">
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
      </div>
    </div>
  );
}
