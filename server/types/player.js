const GraphQL = require("graphql");
const { GraphQLString, GraphQLInt,GraphQLBoolean } = GraphQL;

const playerType = new GraphQL.GraphQLObjectType({
  name: "playerType",
  description: "player Details",
  fields: () => ({
    playerName: {
      type: GraphQLString,
      description: "Player name GraphQLString"
    },
    runs: {
      type: GraphQLInt,
      description: "player runs GraphQLInt"
    },
    wickets: {
      type: GraphQLInt,
      description: "player wickets  GraphQLInt"
    },
    catches: {
      type: GraphQLInt,
      description: "player catches GraphQLInt"
    },
    century: {
      type: GraphQLInt,
      description: "player century GraphQLInt"
    },
   
    image: {
      type: GraphQLString,
      description: "player image GraphQLString"
    },
    matches: {
      type: GraphQLInt,
      description: "player matches GraphQLInt"
    },
    _id: {
      type: GraphQLString,
      description: "Player id"
    },
    status: {
      type: GraphQLBoolean,
      description: "status"
    },
    msg: {
      type: GraphQLInt,
      description: "msg"
    }
  })
});
module.exports = playerType;
