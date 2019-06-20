import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import NavigationBar from "./NavigationBar";

const EpisodesQuery = gql`
  query($page: Int!) {
    episodes(page: $page) {
      info {
        count
        next
        prev
        pages
      }
      results {
        id
        name
        air_date
      }
    }
  }
`;

function Episodes() {
  const [page, setPage] = useState(1);
  return (
    <>
      <header className="header">
        <h1>Rick & Morty Episodes Base</h1>
        <NavigationBar />
        {/* <input
          type="text"
          value={episode}
          placeholder="Type episode title"
          onChange={e => setEpisode(e.target.value)}
        /> */}
      </header>
      <main>
        <Query variables={{ page }} query={EpisodesQuery}>
          {({
            loading,
            error,
            data: {
              episodes: {
                info: { next, prev, pages, count } = {},
                results
              } = {}
            } = {}
          }) => {
            console.log(loading, error, results);

            return <>OK</>;
          }}
        </Query>

        {/* <Query variables={{ page, episode }} query={EpisodeQuery} /> */}
      </main>
    </>
  );
}

export default Episodes;
