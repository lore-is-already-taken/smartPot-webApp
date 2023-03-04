import { IncomingHttpHeaders } from "http";
import { app, client, io, server } from "./configs";
import { getMongoData } from "./db/mongo.config";
import {
  clientEndpoints,
  smartPotEndpoints,
} from "./utilities/routes.utilities";

io.on("connection", (socket) => {
  console.log(`user connected with ID: ${socket.id}`);
});

client.on("connect", () => {
  client.subscribe(smartPotEndpoints.DATA, (err) => {
    if (!err) {
      console.log(`conection to ${smartPotEndpoints.DATA} succesfull`);
    }
  });
});

let LAST_TIME: number = 0;
client.on("message", (topic, payload) => {
  if (topic === smartPotEndpoints.DATA) {
    const mensaje = JSON.parse(payload.toString());

    io.emit(clientEndpoints.ENVIRONMENT_DATA, mensaje);
    let WRITE_TIME = new Date().getUTCSeconds();

    if (WRITE_TIME % 5 === 0 && WRITE_TIME !== LAST_TIME) {
      LAST_TIME = WRITE_TIME;
      console.log(mensaje);
    }
  }
});

app.get("/", (_req, res) => {
  console.log("he recivido algo");
  res.send("miau");
});

app.post("/smartpot", (req, res) => {
  const data: IncomingHttpHeaders = req.headers;

  client.publish("bit0/smartpot/1/rele1", data.toString());
  res.send("respuesta del server");
});

app.get("/graphdata", async (_req, res) => {
  const response = await getMongoData();

  res.send(response);
});

server.listen(8000);
