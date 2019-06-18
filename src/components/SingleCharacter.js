import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const SingleCharacterQuery = gql`
  query($character: String!, $page: Int!) {
    characters(page: $page, filter: { name: $character }) {
      info {
        count
        next
        prev
        pages
      }
      results {
        name
        id
      }
    }
  }
`;

const SingleCharacter = info => {
  const [character, setCharacter] = useState("");
  const [page, setPage] = useState(1);
  return (
    <>
      <input
        type="text"
        value={character}
        onChange={e => setCharacter(e.target.value)}
      />
      <Query variables={{ page, character }} query={SingleCharacterQuery}>
        {({
          loading,
          error,
          data: {
            characters: { info: { next, prev, pages } = {}, results } = {}
          } = {}
        }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          next = next ? next : 1;
          prev = prev ? prev : 1;
          return (
            <>
              {info.count > 0 && info.count}
              {results
                ? results.map(({ name, id }) => <p key={id}>{name}</p>)
                : "Nothing found"}
              <button type="button" onClick={() => setPage(prev)}>
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                Next
              </button>
              <div>{paginationButtons(pages, setPage, page)}</div>
            </>
          );
        }}
      </Query>
    </>
  );
};

const paginationButtons = (pages, setPage, currentPage) => {
  const pageButtons = [];

  for (let i = 1; i <= pages; i++) {
    pageButtons.push(
      <button
        className={currentPage === i ? "btn active" : "btn"}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
    );
  }
  return pageButtons;
};

export default SingleCharacter;
