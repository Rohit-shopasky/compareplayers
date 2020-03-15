const express = require("express");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
var cors = require("cors");
const MainSchema = require("./schema");
var app = express();
var port = process.env.PORT || 4524;
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://root:root@cluster0-hg20y.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("running with ", port);
    });
  })
  .catch(err => {
    console.log(err);
  });
app.use(
  "/",
  expressGraphQL((request, response) => {
    return {
      graphiql: true,
      schema: MainSchema
    };
  })
);
