var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'blinkm', driver: 'blinkm' }
})

.on('ready', function(robot) {
  robot.blinkm.stopScript();

  robot.blinkm.getFirmware(function(err, version) {
    console.log("Started BlinkM version " + version);
  });

  robot.blinkm.goToRGB(0,0,0);
  robot.blinkm.getRGBColor(function(err, data) {
    console.log("Starting Color: ", data);
  });

  setTimeout(function() {
    robot.blinkm.getRGBColor(function(err, data) {
      console.log("Current Color: ", data);
    });
    robot.blinkm.fadeToRandomRGB(128, 128, 128);
  }, 2000);
})

.start();
