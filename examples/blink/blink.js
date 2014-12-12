var Cylon = require('cylon');

Cylon.robot({
  connections: {
    tessel: { adaptor: 'tessel' }
  },

  devices: {
    led: { driver: 'led', pin: 1 }
  },

  work: function(my) {
    every((1).seconds(), function() { my.led.toggle() });
  }
}).start();
