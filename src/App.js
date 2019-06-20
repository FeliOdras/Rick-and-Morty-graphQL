import React from "react";
// import of Apollo stuff
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Switch, Route } from "react-router-dom";

import SingleCharacter from "./components/SingleCharacter";
import Episodes from "./components/Episodes";
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
      <div className="App">
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={SingleCharacter} />
            <Route exact path="/episodes" component={Episodes} />
          </Switch>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
