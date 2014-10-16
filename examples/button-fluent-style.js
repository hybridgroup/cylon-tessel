var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel' },
  devices: [
    { name: 'led', driver: 'led', pin: 1 },
    { name: 'button', driver: 'button' }
  ]
})

.on('ready', function(robot) {
    robot.button.on('push', function() {
      robot.led.toggle();
    });
})

.start();
