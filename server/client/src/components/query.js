import gql from 'graphql-tag'

export const getAllPlayers = gql`
query getAllPlayers{
    getAllPlayers{
    playerName
    runs
    wickets
    catches
    matches
    century
    image
    _id
  }
}
`;

export const searchPlayer = gql`
query searchPlayer($playerName:String!){
    searchPlayer(playerName:$playerName){
    playerName
    runs
    wickets
    catches
    matches
    century
    image
    _id
  }
}
`;

export const createPlayer = gql`
mutation createPlayer($playerName:String!,$runs:Int!,$wickets:Int!,$catches:Int!,$matches:Int!,$century:Int!,$image:String!){
    createPlayer(playerName:$playerName,runs:$runs,wickets:$wickets,catches:$catches,matches:$matches,century:$century,image:$image){
    status
  }
}
`;