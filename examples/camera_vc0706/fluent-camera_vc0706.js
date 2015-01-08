"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("tessel", { adaptor: "tessel" })
  .connection("tessel_A", { adaptor: "tessel", port: "A" })

  .device("led", { driver: "led", pin: 1, connection: "tessel" })
  .device("button", { driver: "button", pin: "config", connection: "tessel" })
  .device("camera", { driver: "camera-vc0706", connection: "tessel_A" })

  .on("ready", function(bot) {
    bot.camera.on("error", function (err) {
      console.log("Camera error: ", err);
    });

    bot.camera.setCompression(0.4, function(err) {
      if (err) {
        console.log("error setting compression: ", err);
      }
    });

    bot.button.on("push", function() {
      bot.led.turnOn();
      bot.camera.takePicture(function(err, image) {
        if (err) {
          console.log("error taking image", err);
        } else {
          // Name the image
          var name = "picture-" + Math.floor(Date.now()*1000) + ".jpg";
          // Save the image
          console.log("Picture saving as", name, "...");
          process.sendfile(name, image);
        }
        bot.led.turnOff();
      });
    });
  });

Cylon.start();
