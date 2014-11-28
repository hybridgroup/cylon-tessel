var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel' },
  devices: [
    { name: 'led', driver: 'led', pin: 1 },
    { name: 'button', driver: 'button', pin: 'config' }
  ],

  work: function(my) {
    my.button.on('push', function() {
      my.led.toggle();
    });
  }
}).start();
