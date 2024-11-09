import Sidebar from "@/components/Sidebar/Sidebar";
import Offer from "@/components/Offer/Offer";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import { BriefcaseBusiness, Hotel, UsersRound } from "lucide-react";

// Define an array with different job offer data
const jobOffers = [
  {
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    jobType: "Full-time",
    seniority: "Senior",
    remote: true,
    percentages: {
      frown: 5,
      annoyed: 20,
      smile: 75,
    },
  },
  {
    jobTitle: "Backend Engineer",
    company: "DataSolutions Ltd.",
    jobType: "Full-time",
    seniority: "Mid-level",
    remote: false,
    percentages: {
      frown: 10,
      annoyed: 15,
      smile: 75,
    },
  },
  {
    jobTitle: "UI/UX Designer",
    company: "CreativeX Agency",
    jobType: "Contract",
    seniority: "Junior",
    remote: true,
    percentages: {
      frown: 3,
      annoyed: 7,
      smile: 90,
    },
  },
  {
    jobTitle: "Project Manager",
    company: "Innovate Ltd.",
    jobType: "Full-time",
    seniority: "Senior",
    remote: false,
    percentages: {
      frown: 8,
      annoyed: 18,
      smile: 74,
    },
  },
];

export default function Home() {
  return (
    <div className="mt-24 flex justify-center w-full">
      {/* Sidebar on the left with fixed width */}
      <div className="flex absolute justify-center gap-16 top-40 z-30">
        <InfoBlock>
          <div className="flex gap-6">
            <div className="bg-blue-200 p-4 rounded-md flex justify-center items-center">
              <BriefcaseBusiness className="text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span>Active Jobs</span>
              <span className="text-4xl">2,534</span>
            </div>
          </div>
        </InfoBlock>
        <InfoBlock>
          <div className="flex gap-6">
            <div className="bg-green-200 p-4 rounded-md flex justify-center items-center">
              <Hotel className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span>Companies</span>
              <span className="text-4xl">2,534</span>
            </div>
          </div>
        </InfoBlock>
        <InfoBlock>
          <div className="flex gap-6">
            <div className="bg-fuchsia-200 p-4 rounded-md flex justify-center items-center">
              <UsersRound className="text-fuchsia-400 " />
            </div>
            <div className="flex flex-col">
              <span>Job Seekers</span>
              <span className="text-4xl">2,534</span>
            </div>
          </div>
        </InfoBlock>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 max-w-[1200px] mx-auto grid grid-cols-1 gap-4 p-4 overflow-y-auto max-h-[600px] custom-scrollbar">
        {jobOffers.map((offer, index) => (
          <Offer
            key={index}
            jobTitle={offer.jobTitle}
            company={offer.company}
            jobType={offer.jobType}
            seniority={offer.seniority}
            remote={offer.remote}
            percentages={offer.percentages}
          />
        ))}
      </div>
    </div>
  );
}
