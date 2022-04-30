const http = require("http"); // in order to build server with socket io
const express = require("express");
const app = express();
const cors = require("cors"); // corse cause socket.io deals with lots of cors issues

app.use(cors());

const server = http.createServer(app);


server.listen(3001, () => {
    console.log("SERVER BOOTUP") // execute this whenever server starts running
})