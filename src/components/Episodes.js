import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import NavigationBar from "./NavigationBar";
import { paginationButton } from "../helpers/index";

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
        episode
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

            next = next ? next : pages;
            prev = prev ? prev : 1;

            return (
              <>
                <main>
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
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Aired on</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results
                        ? results.map(({ id, name, air_date }) => (
                            <tr key={id}>
                              <td>{id}</td>
                              <td>{name}</td>
                              <td>{air_date}</td>
                            </tr>
                          ))
                        : '<p className="button">Nothing found</p>'}
                    </tbody>
                  </table>
                  <section className="pagination">
                    <div className="pagination-pages">
                      {paginationButton(pages, setPage, page)}
                    </div>
                  </section>
                </main>
              </>
            );
          }}
        </Query>
      </main>
    </>
  );
}

export default Episodes;
