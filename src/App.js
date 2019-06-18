import React, { useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import { Characters } from "./components/Characters";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

function App() {
  const [page, setPage] = useState(1);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Characters />
        {/* <Query query={GET_RM_CHARACTERS} variables={{ page }}>
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
        </Query> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
