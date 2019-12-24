const express = require('express');
const app = express();


app.get('/', function(req, res) {
    res.send('<h1>hello world</h1>');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, function() {
    console.log("server started on port", PORT);
});