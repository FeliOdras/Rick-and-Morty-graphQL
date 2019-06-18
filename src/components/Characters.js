import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

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
export class Characters extends Component {
  render() {
    return (
      <Query query={GET_RM_CHARACTERS}>
        {({ loading, error, data: { characters: { info, results } = {} } }) => {
          console.log(loading, error, info, results);
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return results.map(({ name, id }) => <p key={id}>{name}</p>);
        }}
      </Query>
    );
  }
}

export default Characters;
