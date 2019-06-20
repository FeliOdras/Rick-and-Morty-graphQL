import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "../style/style.scss";

import NavigationBar from "./NavigationBar";

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
        <NavigationBar />
        <input
          type="text"
          value={character}
          placeholder="Type character name"
          onChange={e => setCharacter(e.target.value)}
        />
      </header>
      <main>
        <Query variables={{ page, character }} query={SingleCharacterQuery}>
          {({
            loading,
            error,
            data: {
              characters: {
                info: { next, prev, pages, count } = {},
                results
              } = {}
            } = {}
          }) => {
            if (loading)
              return (
                <p className="button">
                  Loading <i className="fas fa-spinner fa-spin" />{" "}
                </p>
              );
            if (error)
              return (
                <p className="button">
                  Error <i className="fas fa-exclamation-triangle" />
                </p>
              );

            next = next ? next : 1;
            prev = prev ? prev : 1;
            return (
              <>
                <section className="count">
                  <div className="prev-next">
                    <button type="button" onClick={() => setPage(prev)}>
                      <i className="fas fa-chevron-left" />
                    </button>
                  </div>
                  <button>
                    Total entries: {count} on {pages}{" "}
                    {pages <= 1 ? "page" : "pages"}
                  </button>
                  <div className="prev-next">
                    <button type="button" onClick={() => setPage(next)}>
                      <i className="fas fa-chevron-right" />
                    </button>
                  </div>
                </section>

                <section className="character-list">
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
                          <article className="character-details" key={id}>
                            <h3>
                              {name}
                              <span className="subtitle">
                                {" "}
                                {species}
                                {type !== "" ? ", " : ""}
                                {type} from <br />{" "}
                                {origin.name === "unknown"
                                  ? "unknown location"
                                  : origin.name}
                              </span>
                            </h3>
                            <img
                              src={image}
                              alt={name}
                              className="character-image"
                            />
                            <div className="detail-icons">
                              <div className="detail-icon-box">
                                {status === "Alive" ? (
                                  <i className="far fa-grin-beam" />
                                ) : status === "Dead" ? (
                                  <i className="far fa-dizzy" />
                                ) : (
                                  <i className="far fa-question-circle" />
                                )}
                              </div>
                              <div className="detail-icon-box">
                                {gender === "Male" ? (
                                  <i className="fas fa-mars" />
                                ) : gender === "Female" ? (
                                  <i className="fas fa-venus" />
                                ) : gender === "Genderless" ? (
                                  <i className="fas fa-genderless" />
                                ) : (
                                  <i className="fas fa-question" />
                                )}
                              </div>
                            </div>
                          </article>
                        )
                      )
                    : "Nothing found"}
                </section>
                <section className="pagination">
                  <div className="pagination-pages">
                    {paginationButtons(pages, setPage, page)}
                  </div>
                </section>
              </>
            );
          }}
        </Query>
      </main>
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
