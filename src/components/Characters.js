import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { number } from "prop-types";

const allCharactersQuery = gql`
  query($page: Int!) {
    characters(page: $page) {
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
        gender
        species
        status
        origin {
          name
        }
      }
    }
  }
`;

const allCharacters = ({ page, setPage }) => {
  return (
    <>
      <Query variables={{ page }} query={allCharactersQuery}>
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
              <h2>
                Page {next - 1} of {pages}
              </h2>
              <button type="button" onClick={() => setPage(prev)}>
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                Next
              </button>
              {results.map(
                ({ name, id, image, species, gender, origin, status }) => (
                  <div className="character-details" key={id}>
                    <h3>{name}</h3>
                    <p>
                      <img
                        src={image}
                        alt={name}
                        className="character-image"
                        width="150"
                      />
                    </p>
                    <div className="character-detail">
                      <div className="detail-title">Species</div>
                      <div className="detail-description">{species}</div>
                    </div>
                    <div className="character-detail">
                      <div className="detail-title">Gender</div>
                      <div className="detail-description">{gender}</div>
                    </div>
                    <div className="character-detail">
                      <div className="detail-title">Status</div>
                      <div className="detail-description">
                        {status === "Alive"
                          ? "💓"
                          : status === "Dead"
                          ? "✝"
                          : "❓"}
                      </div>
                    </div>
                    <div className="character-detail">
                      <div className="detail-title">Origin</div>
                      <div className="detail-description">{origin.name}</div>
                    </div>
                  </div>
                )
              )}
              <button type="button" onClick={() => setPage(prev)}>
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                Next
              </button>
              <div>{paginationButtons(pages, setPage, next - 1)}</div>
            </>
          );
        }}
      </Query>
    </>
  );
};

const paginationButtons = (pageCount, setPage, currentPage) => {
  const pageButtons = [];
  console.log(currentPage);
  for (let i = 1; i < pageCount; i++) {
    pageButtons.push(
      <button
        className={currentPage === i ? "active" : ""}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
    );
  }

  return pageButtons;
};

allCharacters.propTypes = {
  page: number.isRequired
};

export default allCharacters;
