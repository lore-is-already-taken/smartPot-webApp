// SETUP SERVER, SOCKET.IO AND APP CONFIGS
const { io, server, app } = require("./src/configs/socketIoConfig");

// mqtt configs
const { client } = require("./src/configs/mqttConfig");

// lore endPoints IMPORTS
const { smartpotEndpoints } = require("./src/routes/smartPotEndpoints");
const { clientEndpoint } = require("./src/routes/userEndPoints");
const { writeInMongo, getData } = require("./src/utilities/mongoServices");

//muestra el mensaje cuando un usuario se conecte
io.on("connection", (socket) => {
  console.log(`user connected with ID: ${socket.id}`);
});

// esto para la configuracion de mosquitto
client.on("connect", () => {
  client.subscribe(smartpotEndpoints.data, (err) => {
    if (!err) {
      //client.publish("message", `te has conectado a ${smartpotEndpoints.data}`);
      console.log(`conection to ${smartpotEndpoints.data} succesfull`);
    }
  });
});

//
// este client.on("message", etc...) recibe todos los mensajes de cualquier cosa
// payload es el contenido del mensaje es lo que recibe y envia el mqtt

let LAST_TIME = "";
client.on("message", (topic, payload) => {
  if (topic === smartpotEndpoints.data) {
    //let WRITE_TIME = new Date().getUTCMinutes();
    const mensaje = JSON.parse(payload.toString());
    io.emit(clientEndpoint.enviromentData, mensaje);

    let WRITE_TIME = new Date().getUTCSeconds();
    if (WRITE_TIME % 5 === 0 && WRITE_TIME !== LAST_TIME) {
      LAST_TIME = WRITE_TIME;

      //con esto aca cada segundo se envia un dato
      const saveData = writeInMongo(mensaje);
      io.emit("graphInfo", saveData);
    }
  }
});

//

// ########## general GET POST PUT shit ###########

//

app.post("/smartpot", (req, res) => {
  const data = req.headers;

  client.publish("bit0/smartpot/1/rele1", data.msg);
  res.send("respuesta del server");
});

app.get("/graphdata", async (req, res) => {
  const response = await getData();

  res.send(response);
});

//app.listen(8000);
server.listen(8000);
