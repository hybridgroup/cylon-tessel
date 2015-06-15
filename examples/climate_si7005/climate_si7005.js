"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "A" }
  },

  devices: {
    climate: { driver: "climate-si7005" }
  },

  work: function(my) {
    my.climate.on("error", function(err) {
      console.log(err);
    });

    every((1).seconds(), function() {
      my.climate.readHumidity(function(err, humid) {
        if (err) { console.error(err); }
        console.log("Humidity:", humid.toFixed(4) + "%RH");
      });

      my.climate.readTemperature("f", function(err, temp) {
        if (err) { console.error(err); }
        console.log("Degrees:", temp.toFixed(4) + "F");
      });
    });
  }
}).start();
