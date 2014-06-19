var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel' },
  device: { name: 'led', driver: 'led', pin: 2 },

  work: function(my) {
    every((1).seconds(), function() { my.led.toggle() });
  }
}).start();
