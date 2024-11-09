"use client";

import { Filter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface FilterState {
  jobType: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
    remote: boolean;
    "flexible working conditions": boolean;
    "mental health support": boolean;
  };
  experienceLevel: {
    entry: boolean;
    mid: boolean;
    senior: boolean;
    lead: boolean;
  };
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    jobType: {
      fullTime: false,
      partTime: false,
      contract: false,
      remote: false,
      "flexible working conditions": false,
      "mental health support": false,
    },
    experienceLevel: {
      entry: false,
      mid: false,
      senior: false,
      lead: false,
    },
  });

  const toggleFilter = (
    category: keyof FilterState,
    filter: keyof FilterState["jobType"] | keyof FilterState["experienceLevel"]
  ) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [filter as keyof (typeof prevFilters)[typeof category]]:
          !prevFilters[category][
            filter as keyof (typeof prevFilters)[typeof category]
          ],
      },
    }));
  };

  const isActiveLink = (path: string) => pathname === path;
  const showFilters = pathname === "/";

  return (
    <div className="text-black flex items-start p-6 rounded-xl text-lg flex-col mt-9 ml-7 h-auto w-[300px] bg-white absolute">
      <div className="mb-8 flex flex-col text-2xl gap-2 shadow-md w-[300px] p-6 rounded-xl">
        <Link
          href="/"
          className={`cursor-pointer ${
            isActiveLink("/") ? "text-sky-400 font-bold" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/profile"
          className={`cursor-pointer ${
            isActiveLink("/profile") ? "text-sky-400 font-bold" : ""
          }`}
        >
          Profile
        </Link>
        <Link
          href="/survey"
          className={`cursor-pointer ${
            isActiveLink("/survey") ? "text-sky-400 font-bold" : ""
          }`}
        >
          Survey
        </Link>
      </div>

      {showFilters && (
        <div className="shadow-md w-[300px] p-6 rounded-xl">
          <div className="flex justify-between">
            <h2 className="text-2xl mb-4 font-semibold">Filters</h2>
            <Filter />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Job Type</h3>
            <ul className="text-base flex flex-col gap-2">
              {(
                [
                  "fullTime",
                  "partTime",
                  "contract",
                  "remote",
                  "flexible working conditions",
                  "mental health support",
                ] as const
              ).map((type) => (
                <li key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.jobType[type]}
                    onChange={() => toggleFilter("jobType", type)}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label className="capitalize cursor-pointer">
                    {type.replace(/([A-Z])/g, " $1")}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Experience Level</h3>
            <ul className="text-base flex flex-col gap-2">
              {(["entry", "mid", "senior", "lead"] as const).map((level) => (
                <li key={level} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.experienceLevel[level]}
                    onChange={() => toggleFilter("experienceLevel", level)}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label className="capitalize cursor-pointer">
                    {level.replace(/([A-Z])/g, " $1")} Level
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
