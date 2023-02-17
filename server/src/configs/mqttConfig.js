const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://bit0.duckdns.org:1883");

client.options.username = "bit0";
client.options.password = "quena123123";

module.exports = { client };
