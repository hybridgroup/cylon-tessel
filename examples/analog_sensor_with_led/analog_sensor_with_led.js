"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "GPIO" }
  },

  devices: {
    led: { driver: "led", pin: "G4" },
    sensor: { driver: "analogSensor", pin: "A6" }
  },

  work: function(my) {
    every((0.05).seconds(), function() {
      var val = my.sensor.analogRead().fromScale(0, 1024).toScale(0, 255) | 0;
      console.log("brightness: ", val);
      my.led.brightness(val);
    });
  }
}).start();
