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





mongoose.connect("mongodb://localhost/zzzbcsproj3", { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// mongoose.connect("mongodb://heroku_2ll1xfxt:ul869hll9r420tu5cr89olql87@ds047468.mlab.com:47468/heroku_2ll1xfxt", { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true });




const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log("server started on port", PORT);
});