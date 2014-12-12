var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'GPIO' },
  devices: [
    { name: 'led', driver: 'led', pin: "G4" },
    { name: 'sensor', driver: 'analogSensor', pin: "A6" }
  ]
})

.on('ready', function(robot) {
  setInterval(function() {
    var val = robot.sensor.analogRead().fromScale(0, 1024).toScale(0, 255) | 0;
    console.log("brightness: ", val);
    robot.led.brightness(val);
  }, 50);
})

.start();
