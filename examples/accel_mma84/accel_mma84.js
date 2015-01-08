"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "A" }
  },

  devices: {
    accel: { driver: "accel-mma84" }
  },

  work: function(my) {
    my.accel.on("error", function (err) {
      console.log(err);
    });

    my.accel.on("data", function (xyz) {
      console.log("x:", xyz[0].toFixed(2),
                  "y:", xyz[1].toFixed(2),
                  "z:", xyz[2].toFixed(2));
    });
  }
}).start();
