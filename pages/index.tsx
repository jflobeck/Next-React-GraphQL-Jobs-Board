import Head from "next/head";
import React, { FC, useState } from "react";
import JobResults from "../components/JobResults";
import JobsQuery from "../queries/jobsQuery";
import SelectedJob from "../components/SelectedJob";

export type JobObject = {
  applyUrl: string;
  cities: { name: string }[];
  commitment: { title: string };
  company: { name: string; websiteUrl: string; logoUrl: string };
  countries: { name: string }[];
  description: string;
  id: string;
  postedAt: string;
  tags: { name: string }[];
  title: string;
};

type HomeProps = {
  jobs: Partial<JobObject>[];
};
const Home: FC<HomeProps> = ({ jobs }) => {
  const [activeJob, setActiveJob] = useState(jobs[0]);
  const [queryState, setQueryState] = useState({
    term: "",
  });
  const [filteredList, setFilteredList] = useState(jobs);

  const handleFormChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setQueryState({
      ...queryState,
      [name]: value,
    });

    setFilteredList(
      jobs.filter((job, i) => {
        const tags = job.tags?.[i]?.name.toLowerCase();
        const titles = job.title?.toLowerCase();
        if (!queryState.term) {
          return jobs;
        } else
          return (
            tags?.includes(queryState.term.toLowerCase()) ||
            titles?.includes(queryState.term.toLowerCase())
          );
      })
    );
  };

  return (
    <div className="flex">
      <div className="p-4 w-2/3 bg-slate-100">
        <Head>
          <title>Job Board</title>
          <meta
            name="description"
            content="Job board powered by GraphQL jobs API"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="m-4 pt-6 text-4xl text-center">Find Your Dream Job</h1>

        <div className="mx-auto my-4 pb-6 w-2/3">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex rounded-full border-solid border-2 hover:bg-emerald-900 overflow-hidden"
          >
            <input
              type="text"
              name="term"
              value={queryState.term}
              onChange={(e) => handleFormChange(e)}
              placeholder="Filter by Language or Job Title"
              className="flex-grow p-4"
            />
          </form>
        </div>
        <JobResults
          jobsList={filteredList}
          onJobSelect={(i: number) => setActiveJob(filteredList[i])}
        />
      </div>
      <SelectedJob activeJob={activeJob} jobsList={filteredList} />
    </div>
  );
};

export async function getServerSideProps() {
  return JobsQuery();
}

export default Home;
