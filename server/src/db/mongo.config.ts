import mongoose from "mongoose";
import enviromentData from "./schemas/EnviromentData.schema";

mongoose.connect("mongodb://127.0.0.1:27017/");

const Datos = mongoose.model("enviromentCollection", enviromentData);

const writeInMongo = (data: {
  temperature: string;
  humidity: string;
  soilMoisture: string;
}) => {
  const dateAdded = { date: new Date().toUTCString() };
  const objectReady = { data, dateAdded };

  const datos = new Datos(objectReady);

  datos.save().then(() => console.log("Saved in Mongo"));
};

const getMongoData = async () => {
  console.log("me estan solicitando la data");
  const response = await Datos.find().sort("-dateAdded.date").limit(420);
  return response;
};

export { writeInMongo, getMongoData };
