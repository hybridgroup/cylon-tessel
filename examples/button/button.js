var Cylon = require('cylon');

Cylon.robot({
  connections: {
    tessel: { adaptor: 'tessel' }
  },

  devices: {
    led: { driver: 'led', pin: 1 },
    button: { driver: 'button', pin: 'config' }
  },

  work: function(my) {
    my.button.on('push', function() {
      my.led.toggle();
    });
  }
}).start();
