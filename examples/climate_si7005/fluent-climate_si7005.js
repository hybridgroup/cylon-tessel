"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("tessel", { adaptor: "tessel", port: "A" })
  .device("climate", { driver: "climate-si7005" })

  .on("ready", function(bot) {
    bot.climate.on("error", function(err) {
      console.log(err);
    });

    setInterval(function() {
      bot.climate.readHumidity(function(err, humid) {
        if (err) { console.error(err); }
        console.log("Humidity:", humid.toFixed(4) + "%RH");
      });

      bot.climate.readTemperature("f", function(err, temp) {
        if (err) { console.error(err); }
        console.log("Degrees:", temp.toFixed(4) + "F");
      });
    }, 1000);
  });

Cylon.start();
