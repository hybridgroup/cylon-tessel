"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "A" }
  },

  devices: {
    servo: { driver: "servo-pca9685" }
  },

  work: function(my) {
    var servo1 = 1; // We have a servo plugged in at position 1
    var position = 0;  // Target position of the servo between 0 and 1.

    my.servo.on("error", function (err) {
      console.log(err);
    });

    //  Set the minimum and maximum duty cycle for servo 1.
    //  If the servo doesn't move to its full extent or stalls out
    //  and gets hot, try tuning these values (0.05 and 0.12).
    //  Moving them towards each other = less movement range
    //  Moving them apart = more range, more likely to stall and burn out
    my.servo.configure(servo1, 0.05, 0.12, function () {
      every((0.5).seconds(), function() {
        console.log("Position (in range 0-1):", position);
        //  Set servo #1 to position pos.
        my.servo.move(servo1, position);

        // Increment by 10% (~18 deg for a normal servo)
        position += 0.1;
        if (position > 1) {
          position = 0; // Reset servo position
        }
      });
    });
  }
}).start();
