const http = require("http"); // in order to build server with socket io
const express = require("express");
const app = express();
const cors = require("cors"); // corse cause socket.io deals with lots of cors issues
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {     
        // Settings related to cors for socket.io
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

server.listen(3001, () => {
    console.log("SERVER BOOTUP"); // execute this whenever server starts running
});

io.on("connection", (socket) => {     // 'on' means listening for the even which in this case is 'connection' and 'socket' as action
    console.log(`User: ${socket.id} Connected`);     // every user gets a different id

    // Creating a join room event using join function from socket.io
    socket.on("join_room", (data) => {
        socket.join(data);  // taken room id as data from frontend
        console.log(`User ID: ${socket.id} Connected Room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data); // sending and receiving messages to respective rooms
    });


    socket.on("disconnect", () => {
        console.log(`User: ${socket.id} Session Closed`);
    });
});