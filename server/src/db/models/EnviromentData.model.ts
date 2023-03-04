interface EnviromentDataModel {
  data: {
    temperature: String;
    humidity: String;
    soilMoisture: String;
  };

  dateAdded: { date: String };
}

const defaults: Pick<EnviromentDataModel, "dateAdded"> = {
  dateAdded: { date: new Date().toUTCString() },
};

export { EnviromentDataModel, defaults };
