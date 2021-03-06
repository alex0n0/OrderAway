require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//===========for socket io=============
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
//======================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));








require("./api-routes/dbseeds.js")(app);
// require("./api-routes/socketroutes.js")(app);

// io.on("connection", socket => {
//     console.log("New client connected");
    
//     // socket.emit("orderzzzzz", {connectionTest: "available", orderId: undefined});
//     //Here we listen on a new namespace called "incoming data"
//     socket.on("incoming data", (data)=>{
//         //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
//        socket.broadcast.emit("outgoing data", {num: data});
//     });

//     //A special namespace "disconnect" for when a client disconnects
//     socket.on("disconnect", () => console.log("Client disconnected"));
// });

require("./api-routes")(app);




console.log(process.env.MONGO_USERNAME);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@orderaway.pqnlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true });


const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log("server started on port", PORT);
});