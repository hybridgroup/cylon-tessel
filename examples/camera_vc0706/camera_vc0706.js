"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel" },
    tessel_A: { adaptor: "tessel", port: "A" },
  },

  devices: {
    led: { driver: "led", pin: 1, connection: "tessel" },
    button: { driver: "button", pin: "config", connection: "tessel" },
    camera: { driver: "camera-vc0706", connection: "tessel_A" },
  },

  work: function(my) {
    my.camera.on("error", function(err) {
      console.log("Camera error: ", err);
    });

    my.camera.setCompression(0.4, function(err) {
      if (err) {
        console.log("error setting compression: ", err);
      }
    });

    my.button.on("push", function() {
      my.led.turnOn();
      my.camera.takePicture(function(err, image) {
        if (err) {
          console.log("error taking image", err);
        } else {
          // Name the image
          var name = "picture-" + Math.floor(Date.now() * 1000) + ".jpg";
          // Save the image
          console.log("Picture saving as", name, "...");
          process.sendfile(name, image);
        }
        my.led.turnOff();
      });
    });
  }
}).start();
