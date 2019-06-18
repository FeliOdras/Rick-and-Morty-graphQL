import { React } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const SingleCharacterQuery = gql`
    query(Character: String!){
        characters(filter:{name: $character}){
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

const SingleCharacter = () => {
  const [character, setCharacter] = useState("Rick");

  return (
    <div>
      <input type="text" />
      <Query variables={{ character }} query={SingleCharacterQuery} />
    </div>
  );
};
