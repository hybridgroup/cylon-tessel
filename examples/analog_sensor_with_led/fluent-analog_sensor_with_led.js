"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("tessel", { adaptor: "tessel", port: "GPIO" })
  .device("led", { driver: "led", pin: "G4" })
  .device("sensor", { driver: "analogSensor", pin: "A6" })
  .on("ready", function(bot) {
    setInterval(function() {
      var val = bot.sensor.analogRead().fromScale(0, 1024).toScale(0, 255) | 0;
      console.log("brightness: ", val);
      bot.led.brightness(val);
    }, 50);
  })

.start();
