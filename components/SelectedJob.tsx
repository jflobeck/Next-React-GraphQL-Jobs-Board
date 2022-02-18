import React, { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { JobObject } from "../pages/index";

type SelectedJobProps = {
  activeJob: Partial<JobObject>;
};

const SelectedJob: FC<SelectedJobProps> = ({ activeJob }) => {
  const companyLetter = activeJob.company?.name.substring(0, 1).toUpperCase();
  const markdown: string | undefined = activeJob?.description;
  return (
    <div className="pt-6 p-4 flex flex-col w-1/3 text-center">
      <div className="self-center">
        {activeJob.company?.logoUrl ? (
          <Image
            src={activeJob?.company.logoUrl}
            alt={activeJob?.company.name}
            width={120}
            height={120}
          />
        ) : (
          <div className="mb-3 p-10 bg-emerald-600 w-32 h-32 text-center text-white text-4xl ">
            {companyLetter}
          </div>
        )}
      </div>
      <h1 className="text-2xl text-emerald-900" key={activeJob?.title}>
        {activeJob?.title}
      </h1>
      <h2 className="text-xl" key={activeJob?.id}>
        {activeJob.company?.name}
      </h2>
      <div className="flex self-center">
        {activeJob.cities?.[0] && (
          <h3>Location: {activeJob?.cities[0].name}</h3>
        )}
        {activeJob.countries?.[0] && <p>{activeJob?.countries[0].name}</p>}
      </div>
      <h3 className="pb-2 text-l italic border-b-2">
        {activeJob.commitment?.title}
      </h3>

      <ReactMarkdown className="m-4" remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
      <a href={activeJob?.applyUrl} target="_blank" rel="noreferrer">
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
