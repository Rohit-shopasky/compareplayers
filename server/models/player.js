const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playersModel = new Schema(
  {
    playerName: String,
    runs:{type:Number,default:0},
    wickets: {type:Number,default:0},
    catches: {type:Number,default:0},
    matches: {type:Number,default:0},
    century: {type:Number,default:0},
    image: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("players", playersModel);

