const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));









require("./api-routes/dbseeds.js")(app);
require("./api-routes")(app);








mongoose.connect("mongodb://localhost/zzzbcsproj3", { useFindAndModify: false });


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, function () {
    console.log("server started on port", PORT);
});