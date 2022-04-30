const http = require("http"); // in order to build server with socket io
const express = require("express");
const app = express();
const cors = require("cors"); // corse cause socket.io deals with lots of cors issues
const { Server } = reqire("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {     
        // Settings related to cors for socket.io
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {     // 'on' means listening for the even which in this case is 'connection' and 'socket' as action
    console.log(socket.id);     // every user gets a different id
    
    socket.on("disconnect", () => {
        console.log("User Session Close", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER BOOTUP"); // execute this whenever server starts running
})