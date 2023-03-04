import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mqtt from "mqtt";

const app = express();

app.use(cors({ origin: "*" }));

//empezamos a configurar el socket

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
// con esto nuestro servidor queda configurado para prender

//configuration del mqtt
const client = mqtt.connect("mqtt://bit0.duckdns.org:1883");
client.options.username = "bit0";
client.options.password = "quena123123";

export { app, server, io, client };
