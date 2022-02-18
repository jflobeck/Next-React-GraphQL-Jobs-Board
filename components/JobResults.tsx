import React, { FC } from "react";
import Image from "next/image";
import { JobObject } from "../pages/index";

type JobResultsProps = {
  jobsList: Partial<JobObject>[];
  onJobSelect: Function;
};
const JobResults: FC<JobResultsProps> = ({ jobsList, onJobSelect }) => {
  return (
    <div className="flex flex-col justify-center">
      {jobsList.map((job, i) => {
        const companyLetter = job.company?.name.substring(0, 1).toUpperCase();
        const dateString = job.postedAt?.split("T")[0];

        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        };
        return (
          <div
            key={job.id}
            className="mx-4 my-2 pl-6 p-3 border-solid rounded-md border-2 hover:border-emerald-600 bg-white"
            onClick={() => {
              onJobSelect(i);
              scrollToTop();
            }}
          >
            <div className="flex items-center">
              {job.company?.logoUrl ? (
                <div>
                  <Image
                    src={job.company.logoUrl}
                    alt={job.company.name}
                    width={100}
                    height={100}
                  />
                </div>
              ) : (
                <div className="p-6 bg-emerald-600 w-24 h-24 self-center text-center text-white text-4xl">
                  {companyLetter}
                </div>
              )}

              <div className="pl-4 py-4 flex flex-col">
                <h2 className="text-xl text-emerald-900">
                  {job.company?.name}
                </h2>
                <h3 className="text-lg italic">{job.title}</h3>

                <div className="text-md flex">
                  {job.cities?.[0] && (
                    <Image
                      src="/location-ico.png"
                      alt="location icon"
                      width={20}
                      height={15}
                    />
                  )}
                  {job.cities?.[0] && <p>{job.cities[0].name}</p>}
                  {job.countries?.[0] && <p>{job.countries[0].name}</p>}
                </div>
                <div className="flex">
                  <p className="text-sm">{job.commitment?.title}</p>
                  <p className="pl-1 text-sm">Posted Date: {dateString}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobResults;
