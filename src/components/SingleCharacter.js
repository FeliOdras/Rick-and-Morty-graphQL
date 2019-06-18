import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "../style/style.scss";

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
        image
        species
        type
        status
        gender
        origin {
          name
        }
      }
    }
  }
`;

const SingleCharacter = info => {
  const [character, setCharacter] = useState("");
  const [page, setPage] = useState(1);
  return (
    <>
      <header className="header">
        <h1>Rick & Morty Character Base</h1>
        <input
          type="text"
          value={character}
          placeholder="Type character name"
          onChange={e => setCharacter(e.target.value)}
        />
      </header>
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
                ? results.map(
                    ({
                      name,
                      id,
                      image,
                      species,
                      status,
                      gender,
                      type,
                      origin
                    }) => (
                      <div className="character-details" key={id}>
                        <h3>
                          {name}
                          <span className="subtitle">
                            {" "}
                            ({species}
                            {type !== "" ? ", " : ""}
                            {type})
                          </span>
                        </h3>
                        <img
                          src={image}
                          alt={name}
                          className="character-image"
                        />
                        <div>
                          Status:
                          {status === "Alive" ? (
                            <i className="far fa-grin-beam" />
                          ) : status === "Dead" ? (
                            <i className="far fa-dizzy" />
                          ) : (
                            <i className="far fa-question-circle" />
                          )}
                          | Gender:
                          {gender === "Male" ? (
                            <i className="fas fa-mars" />
                          ) : gender === "Female" ? (
                            <i className="fas fa-venus" />
                          ) : gender === "Genderless" ? (
                            <i className="fas fa-genderless" />
                          ) : (
                            <i className="fas fa-question" />
                          )}
                          Origin {origin.name}
                        </div>
                      </div>
                    )
                  )
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
