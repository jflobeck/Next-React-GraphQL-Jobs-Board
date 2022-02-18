import React, { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
// import { ReactDOM } from "react";
// import Home from "../pages";
import remarkGfm from "remark-gfm";
import { JobObject } from "../pages/index";

type SelectedJobProps = {
  activeJob: number;
  jobsList: Partial<JobObject>[];
};

const SelectedJob: FC<SelectedJobProps> = ({ activeJob, jobsList }) => {
  const currentJob: Partial<JobObject> = jobsList[activeJob];
  const companyLetter = currentJob.company?.name.substring(0, 1).toUpperCase();
  const markdown = currentJob?.description;
  return (
    <div className="pt-6 p-4 flex flex-col w-1/3 text-center">
      <div className="self-center">
        {currentJob.company?.logoUrl ? (
          <Image
            src={currentJob?.company.logoUrl}
            alt={currentJob?.company.name}
            width={120}
            height={120}
          />
        ) : (
          <div className="mb-3 p-10 bg-emerald-600 w-32 h-32 text-center text-white text-4xl ">
            {companyLetter}
          </div>
        )}
      </div>
      <h1 className="text-2xl text-emerald-900" key={currentJob?.title}>
        {currentJob?.title}
      </h1>
      <h2 className="text-xl" key={currentJob?.id}>
        {currentJob.company?.name}
      </h2>
      <div className="flex self-center">
        {currentJob.cities?.[0] && (
          <h3>Location: {currentJob?.cities[0].name}</h3>
        )}
        {currentJob.countries?.[0] && <p>{currentJob?.countries[0].name}</p>}
      </div>
      <h3 className="pb-2 text-l italic border-b-2">
        {currentJob.commitment?.title}
      </h3>

      <ReactMarkdown
        className="m-4"
        children={markdown}
        remarkPlugins={[remarkGfm]}
      />
      <a href={currentJob?.applyUrl} target="_blank" rel="noreferrer">
        <button
          type="submit"
          className="m-4 py-4 px-8 flex-none bg-emerald-700 hover:bg-emerald-900 hover:text-white  rounded-full"
        >
          Apply Now
        </button>
      </a>
    </div>
  );
};
export default SelectedJob;
