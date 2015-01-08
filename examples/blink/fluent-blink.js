"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("tessel", { adaptor: "tessel" })
  .device("led", { driver: "led", pin: 1 })
  .on("ready", function(my) {
    setInterval(function() {
      my.led.toggle();
    }, 1000);
  });

Cylon.start();
