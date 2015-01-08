"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "GPIO" }
  },

  devices: {
    sensor: { driver: "analogSensor", pin: "A6" }
  },

  work: function(my) {
    every((0.05).seconds(), function() {
      console.log("value: ", my.sensor.analogRead());
    });
  }
}).start();
