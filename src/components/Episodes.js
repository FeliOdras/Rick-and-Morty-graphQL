import React, { useState } from "react";
import { gql } from "apollo-boost";

import NavigationBar from "./NavigationBar";

const EpisodeQuery = gql`
  query($episode: String!, $page: Int!) {
    episodes(page: $page, filter: { name: $episode }) {
      info {
        count
        next
        prev
        pages
      }
      results {
        episode
        id
        name
        air_date
        characters {
          name
          id
        }
      }
    }
  }
`;

const Episodes = () => {
  const [character, setEpisode] = useState("");
  const [page, setPage] = useState(1);
  return (
    <header className="header">
      <h1>Rick & Morty Episodes Base</h1>
      <input
        type="text"
        value={character}
        placeholder="Type episode title"
        onChange={e => setEpisode(e.target.value)}
      />
      <NavigationBar />
    </header>
  );
};

export default Episodes;
