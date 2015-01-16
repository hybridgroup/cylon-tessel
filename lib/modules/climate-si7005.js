"use strict";

module.exports = {
  events: [
    "ready",
    "error",
    "temperature",
    "humidity"
  ],

  commands: [
    "readTemperature",
    "readHumidity",
    "setHeater",
    "setFastMeasure"
  ],
};
