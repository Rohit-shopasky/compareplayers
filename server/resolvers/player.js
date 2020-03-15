
const playersModel = require("../models/player");


const playerResolver = {
  createPlayer: async (parent, args, context, info) => {
    
    let {playerName,runs,wickets,catches,century,image,matches} = args;
    try {

      if(playerName!="")
      {
        var newPlayer = new playersModel({
          playerName: args.playerName,
          runs: args.runs,
          wickets: args.wickets,
          catches: args.catches,
          matches: args.matches,
          century: args.century,
          image: args.image
        });

       
        let savePlayer = await playersModel.collection.insert(newPlayer);
        console.log("save",savePlayer);
        return {status:true,msg:"player inserted"}
      }
      
    } catch (error) {
      console.log(error);
      return {status:false,msg:"something went wrong!"}
    }
    
  },

  getAllPlayers: async (parent, args, context, info) => {
    console.log("ayaa")
    try {

      let allPlayers = await playersModel.find({});
      console.log(allPlayers);
      return allPlayers;
      
    } catch (error) {
      console.log(error);
      return {status:false,msg:"Something went wrong!!"}
    }
    
  },

  getSpecificPlayer: async (parent, args, context, info) => {
    
    try {
      console.log("id",args);
       let {_id} = args;
      let player = await playersModel.findOne({"_id":_id});
      console.log(player);
      return player;
      
    } catch (error) {
      console.log(error);
      return {status:false,msg:"Something went wrong!!"}
    }
    
  },


  searchPlayer: async (parent, args, context, info) => {
    
    try {
      
       let {playerName} = args;
       //playerName = "/" + playerName + "/i";
      let player = await playersModel.find({playerName:new RegExp(playerName, 'i')}).limit(5);
      console.log(player);
      return player;
      
    } catch (error) {
      console.log(error);
      return {status:false,msg:"Something went wrong!!"}
    }
    
  },

  comparePlayer: async (parent, args, context, info) => {
    
    try {
      
       let {playerName1,playerName2} = args;
       //playerName = "/" + playerName + "/i";
      let player1 = await playersModel.find({playerName:playerName1});
      let player2 = await playersModel.find({playerName:playerName2});

      console.log(player);
      return player;
      
    } catch (error) {
      console.log(error);
      return {status:false,msg:"Something went wrong!!"}
    }
    
  },


  

};

module.exports = playerResolver;
