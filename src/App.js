import React, { useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

const GET_RM_CHARACTERS = gql`
  query data($page: Int) {
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
      }
    }
  }
`;

function App({ page }) {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Query query={GET_RM_CHARACTERS} variables={{ page }}>
          {({
            loading,
            error,
            data: { characters: { info, results } = {} }
          }) => {
            // console.log(loading, error, info, results);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return results.map(({ name, id }) => <p key={id}>{name}</p>);
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
}

export default App;
