require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

require("./api-routes/dbseeds.js")(app);
require("./api-routes")(app);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@orderaway.pqnlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true });

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("server started on port", PORT);
});