import React from "react";
// import of Apollo stuff
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import SingleCharacter from "./components/SingleCharacter";
// Apollo client
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});
// functional component
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SingleCharacter />
      </div>
    </ApolloProvider>
  );
}

export default App;
