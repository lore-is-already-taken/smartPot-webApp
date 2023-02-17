const { default: mongoose } = require("mongoose");
const { enviromentData } = require("../schemas/enviromentData");

mongoose.connect("mongodb://localhost:27017/test");

const Datos = mongoose.model("enviromentCollection", enviromentData);
/*
 *const kitty = new enviromentData({
 *  temperature: "temperature",
 *  soilMoisture: "holasoil moisture",
 *  humidity: "humdad relativa",
 *});
 *kitty.save().then(() => console.log("meow"));
 */

// template basico para agregar datos a mongodb con mongoose

const writeInMongo = (data) => {
  const dateAdded = {
    date: new Date().toUTCString(),
  };

  const objectReady = {
    data,
    dateAdded,
  };

  const enviromentData = new Datos(objectReady);
  console.log(enviromentData);

  enviromentData.save().then(() => console.log("data added to mongo c:"));
};

const getData = async () => {
  console.log("estan soliicitandomelo");

  const getdata = await Datos.find().sort("-dateAdded.date").limit(50);

  return getdata;
};

module.exports = { writeInMongo, getData };

//
