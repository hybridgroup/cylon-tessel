var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'GPIO' },
  devices: [
    { name: 'led', driver: 'led', pin: "G4" },
    { name: 'sensor', driver: 'analogSensor', pin: "A6" }
  ],

  work: function(my) {
    every((0.05).seconds(), function() {
      var val = my.sensor.analogRead().fromScale(0, 1024).toScale(0, 255) | 0;
      console.log("brightness: ", val);
      my.led.brightness(val);
    });
  }
}).start();
