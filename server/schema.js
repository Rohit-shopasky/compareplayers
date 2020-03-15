const GraphQL = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = GraphQL;
const userMutation = require("./mutations/player.js");
const userQuery = require("./query/player");
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "ALL QUERY",
  fields: {
   // getAlluser: userQuery.userList()
   getAllPlayers: userQuery.playerList(),
   getSpecificPlayer: userQuery.getSpecificPlayer(),
   searchPlayer: userQuery.searchPlayer(),
  // comparePlayer:userQuery.comparePlayer(),

  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  description: "ALL MUTATION",
  fields: {
    //createUser: userMutation.createUser()
    createPlayer: userMutation.insertPlayer()
  }
});
const MainSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
module.exports = MainSchema;
