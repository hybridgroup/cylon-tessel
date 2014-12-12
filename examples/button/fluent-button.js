var Cylon = require('cylon');

Cylon
  .robot()
  .connection('tessel', { adaptor: 'tessel' })
  .device('led', { driver: 'led', pin: 1 })
  .device('button', { driver: 'button', pin: 'config' })
  .on('ready', function(robot) {
    robot.button.on('push', function() {
      robot.led.toggle();
    });
  });

Cylon.start();
