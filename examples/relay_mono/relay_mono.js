"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "A" }
  },

  devices: {
    relay: { driver: "relay-mono" }
  },

  work: function(my) {
    my.relay.on("error", function (err) {
      console.log(err);
    });

    my.relay.on("latch", function(channel, value) {
      console.log("latch on relay channel " + channel + " switched to", value);
    });

    every((2).seconds(), function() {
      // Toggle relay channel 1
      my.relay.toggle(1, function toggleOneResult(err) {
        if (err) {
          console.log("Err toggling 1", err);
        }
      });

      // Toggle relay channel 2
      my.relay.toggle(2, function toggleTwoResult(err) {
        if (err) {
          console.log("Err toggling 2", err);
        }
      });
    });
  }
}).start();
