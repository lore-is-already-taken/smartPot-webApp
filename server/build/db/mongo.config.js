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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoData = exports.writeInMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EnviromentData_schema_1 = __importDefault(require("./schemas/EnviromentData.schema"));
mongoose_1.default.connect("mongodb://127.0.0.1:27017/");
const Datos = mongoose_1.default.model("enviromentCollection", EnviromentData_schema_1.default);
const writeInMongo = (data) => {
    const dateAdded = { date: new Date().toUTCString() };
    const objectReady = { data, dateAdded };
    const datos = new Datos(objectReady);
    datos.save().then(() => console.log("Saved in Mongo"));
};
exports.writeInMongo = writeInMongo;
const getMongoData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("me estan solicitando la data");
    const response = yield Datos.find().sort("-dateAdded.date").limit(420);
    console.log("la data es: ", response);
    return response;
});
exports.getMongoData = getMongoData;
