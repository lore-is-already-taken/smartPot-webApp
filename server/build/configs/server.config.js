"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mqtt_1 = __importDefault(require("mqtt"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({ origin: "*" }));
//empezamos a configurar el socket
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
exports.io = io;
// con esto nuestro servidor queda configurado para prender
//configuration del mqtt
const client = mqtt_1.default.connect("mqtt://bit0.duckdns.org:1883");
exports.client = client;
client.options.username = "bit0";
client.options.password = "quena123123";
