"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("tessel", { adaptor: "tessel", port: "A" })
  .device("ambient", { driver: "ambient-attx4" })

  .on("ready", function(bot) {
    bot.ambient.on("error", function (err) {
      console.log(err);
    });

    bot.ambient.on("light", function (data) {
      console.log("Light stream: " + data);
    });

    bot.ambient.on("sound", function (data) {
      console.log("Sound stream: " + data);
    });

    setInterval(function() {
      bot.ambient.getLightLevel(function(err, data) {
        console.log("Current Light level: " + data);
      });

      bot.ambient.getSoundLevel(function(err, data) {
        console.log("Current Sound level:  " + data);
      });
    }, 1000);
  });

Cylon.start();
