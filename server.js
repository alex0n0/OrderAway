const express = require("express");
const app = express();


app.get("/", function(req, res) {
    res.send("<h1>hello world</h1>");
});

app.get("/testingproxy", function(req, res) {
    res.json({"message":"proxy was successful"});
    // res.status(404).end(); // not found
    // res.status(400).end(); // bad request
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, function() {
    console.log("server started on port", PORT);
});