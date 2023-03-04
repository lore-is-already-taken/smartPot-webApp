import { Schema } from "mongoose";

const enviromentData = new Schema({
  data: { temperature: String, humidity: String, soilMoisture: String },
  dateAdded: { date: String },
});

export default enviromentData;
