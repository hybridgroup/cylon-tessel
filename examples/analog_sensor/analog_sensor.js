var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'GPIO' },
  device: { name: 'sensor', driver: 'analogSensor', pin: "A6" },

  work: function(my) {
    every((0.05).seconds(), function() {
      console.log("value: ", my.sensor.analogRead());
    });
  }
}).start();
