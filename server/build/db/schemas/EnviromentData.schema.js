"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enviromentData = new mongoose_1.Schema({
    data: { temperature: String, humidity: String, soilMoisture: String },
    dateAdded: { date: String },
});
exports.default = enviromentData;
