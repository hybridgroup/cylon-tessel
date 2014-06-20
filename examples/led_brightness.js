var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'GPIO' },
  device: { name: 'led', driver: 'led', pin: "G4" },

  work: function(my) {
    var brightness = 0,
        fade = 5;

    every((0.05).seconds(), function() {
      brightness += fade;
      my.led.brightness(brightness);
      if ((brightness === 0) || (brightness === 255)) { fade = -fade; }
    });
  }
}).start();
