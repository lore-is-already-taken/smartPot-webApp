const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("strictQuery", false);

const enviromentData = new Schema({
  data: { temperature: String, humidity: String, soilMoisture: String },
  dateAdded: {
    date: String,
  },
});

module.exports = { enviromentData };
