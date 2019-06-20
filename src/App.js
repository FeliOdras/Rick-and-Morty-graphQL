import React from "react";
// import of Apollo stuff
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Switch, BrowserRouter } from "react-router-dom";

import SingleCharacter from "./components/SingleCharacter";
import { BrowserRouter } from "react-router-dom";
// Apollo client
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

// functional component
class App extends React.Component {
  componentDidMount() {
    document.title = "Rick and Morty Characterbase";
  }
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <div className="App">
            <SingleCharacter />
          </div>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
