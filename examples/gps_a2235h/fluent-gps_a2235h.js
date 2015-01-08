"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("tessel", { adaptor: "tessel", port: "A" })
  .device("gps", { driver: "gps-a2235h" })
  .on("ready", function(bot) {
    var satsInRange = 0;
    var satsFixed = 0;

    console.log("GPS module powered and ready. Waiting for satellites...");

    bot.gps.on("error", function (err) {
      console.log(err);
    });

    // Emit coordinates when we get a coordinate fix
    bot.gps.on("coordinates", function (c) {
      console.log("Lat:", c.lat, "\tLon:", c.lon, "\tTimestamp:", c.timestamp);
    });

    // Emit altitude when we get an altitude fix
    bot.gps.on("altitude", function (alt) {
      var a = alt.alt,
          t = alt.timestamp;

      console.log("Got an altitude of", a, "meters (timestamp: " + t + ")");
    });

    // Emitted whenever satellites are in view
    bot.gps.on("satellite-list-partial", function (data) {
      satsInRange = data.satsInView;
      console.log(satsInRange, "satellites in range,", satsFixed, "fixed.");
    });

    // Emitted when we have information about a fix on satellites
    bot.gps.on("fix", function (data) {
      satsFixed = data.numSat;
      console.log(satsInRange, "satellites in range,", satsFixed, "fixed.");
    });
  });

Cylon.start();
