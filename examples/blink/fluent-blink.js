var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel' },
  device: { name: 'led', driver: 'led', pin: 1 }
})

.on('ready', function(my) {
  setInterval(function() {
    my.led.toggle();
  }, 1000);
})

.start();
