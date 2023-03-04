"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./configs");
const mongo_config_1 = require("./db/mongo.config");
const routes_utilities_1 = require("./utilities/routes.utilities");
configs_1.io.on("connection", (socket) => {
    console.log(`user connected with ID: ${socket.id}`);
});
configs_1.client.on("connect", () => {
    configs_1.client.subscribe(routes_utilities_1.smartPotEndpoints.DATA, (err) => {
        if (!err) {
            console.log(`conection to ${routes_utilities_1.smartPotEndpoints.DATA} succesfull`);
        }
    });
});
let LAST_TIME = 0;
configs_1.client.on("message", (topic, payload) => {
    if (topic === routes_utilities_1.smartPotEndpoints.DATA) {
        const mensaje = JSON.parse(payload.toString());
        configs_1.io.emit(routes_utilities_1.clientEndpoints.ENVIRONMENT_DATA, mensaje);
        let WRITE_TIME = new Date().getUTCSeconds();
        if (WRITE_TIME % 5 === 0 && WRITE_TIME !== LAST_TIME) {
            LAST_TIME = WRITE_TIME;
            console.log(mensaje);
        }
    }
});
configs_1.app.get("/", (_req, res) => {
    console.log("he recivido algo");
    res.send("miau");
});
configs_1.app.post("/smartpot", (req, res) => {
    const data = req.headers;
    configs_1.client.publish("bit0/smartpot/1/rele1", data.toString());
    res.send("respuesta del server");
});
configs_1.app.get("/graphdata", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, mongo_config_1.getMongoData)();
    res.send(response);
}));
configs_1.server.listen(8000);
