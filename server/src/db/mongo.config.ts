import mongoose from "mongoose";
import enviromentData from "./schemas/EnviromentData.schema";

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/");

// this is the collection name in mongo, if it doesn't exist it will be created
const Datos = mongoose.model("enviromentcollection", enviromentData);

const writeInMongo = (data: {
  temperature: string;
  humidity: string;
  soilMoisture: string;
}) => {
  const dateAdded = { date: new Date().toUTCString() };
  // convert with json stringify the data
  const objectReady = { ...data, dateAdded };
  try {
    const datos = new Datos(objectReady);
    datos.save();

    return objectReady;
  } catch (err) {}
};

const getMongoData = async () => {
  console.log("me estan solicitando la data");
  const response = await Datos.find().sort("-dateAdded.date").limit(900);
  return response;
};

export { writeInMongo, getMongoData };
