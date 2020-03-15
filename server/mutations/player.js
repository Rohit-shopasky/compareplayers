"use strict";
const GraphQL = require("graphql");
const { GraphQLString, GraphQLInt, GraphQLBoolean } = GraphQL;
const userType = require("../types/player.js");
const playerResolver = require("../resolvers/player.js");
const userMutation = {
  insertPlayer() {
    return {
      type: userType,
      description: "It will add user in the database",
      args: {
        playerName: {
          type: GraphQLString,
          description: "Player name GraphQLString"
        },
        runs: {
          type: GraphQLInt,
          description: "user runs GraphQLInt"
        },
        wickets: {
          type: GraphQLInt,
          description: "user wickets  GraphQLInt"
        },
        catches: {
          type: GraphQLInt,
          description: "user catches GraphQLInt"
        },
        century: {
          type: GraphQLInt,
          description: "user century GraphQLInt"
        },
       
        image: {
          type: GraphQLString,
          description: "user image GraphQLString"
        },
        matches: {
          type: GraphQLInt,
          description: "user matches GraphQLInt"
        }
      },
      resolve(parent, args, context, info) {
        return playerResolver.createPlayer(parent, args, context, info);
      }
    };
  }
};
module.exports = userMutation;
