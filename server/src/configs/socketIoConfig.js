const express = require("express");
var app = express();
const cors = require("cors");

//const allowedURLS = ["http://localhost:5173", "http://localhost:8000"];

app.use(cors({ origin: "*" }));
// terminamos de setear el servidor

//

//

// esto para habilitar socket.io
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

module.exports = { io, server, app };
