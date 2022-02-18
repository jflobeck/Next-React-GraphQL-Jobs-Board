import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default async function JobsQuery() {
  const client = new ApolloClient({
    uri: "https://api.graphql.jobs",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      fragment BasicInfo on Job {
        id
        title
        tags {
          name
        }
        company {
          name
          websiteUrl
          logoUrl
        }
        description
        cities {
          name
        }
        countries {
          name
        }
        commitment {
          title
        }
        postedAt
        applyUrl
      }

      query getJobs {
        jobs {
          ...BasicInfo
        }
      }
    `,
  });
  return {
    props: {
      jobs: data.jobs,
    },
  };
}
