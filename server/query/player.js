const GraphQL = require("graphql");
const { GraphQLList,GraphQLString } = GraphQL;
const playerType = require("../types/player");
const playerResolver = require("../resolvers/player.js");


const userQuery = {
  playerList() {
    return {
      type: new GraphQLList(playerType),
      description: "All player list",
      resolve(parent, args, context, info) {
        return playerResolver.getAllPlayers();
      }
    };
  },

  getSpecificPlayer() {
    return {
      type: playerType,
      description: "It will add user in the database",
      args: {
        _id: {
          type: GraphQLString,
          description: "Player id"
        },
      },
      resolve(parent, args, context, info) {
        return playerResolver.getSpecificPlayer(parent, args, context, info);
      }
    };
  },

  searchPlayer() {
    return {
      type: new GraphQLList(playerType),
      description: "It will add user in the database",
      args: {
        playerName: {
          type: GraphQLString,
          description: "Player name"
        },
      },
      resolve(parent, args, context, info) {
        return playerResolver.searchPlayer(parent, args, context, info);
      }
    };
  },

  comparePlayer() {
    return {
      type: new GraphQLList(playerType),
      description: "It will add user in the database",
      args: {
        playerName1: {
          type: GraphQLString,
          description: "Player name 1"
        },
        playerName2: {
          type: GraphQLString,
          description: "Player name 2"
        },
      },
      resolve(parent, args, context, info) {
        return playerResolver.comparePlayer(parent, args, context, info);
      }
    };
  },

  



};

module.exports = userQuery;
