var Cylon = require('cylon');

Cylon.robot({
  connections: [
    { name: 'tessel_led', adaptor: 'tessel', port: 'LED' },
    { name: 'tessel_gpio', adaptor: 'tessel', port: 'GPIO' }
  ],

  devices: [
    { name: 'led', driver: 'led', pin: 1, connection: 'tessel_led' },
    { name: 'button', driver: 'button', pin: 3, connection: 'tessel_gpio' }
  ],

  work: function(my) {
    my.button.on('push', function() {
      my.led.toggle();
    });
  }
}).start();
