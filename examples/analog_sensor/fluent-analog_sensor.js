var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'GPIO' },
  device: { name: 'sensor', driver: 'analogSensor', pin: "A6" }
})
.on('ready', function(robot) {
  setInterval(function() {
    console.log("value: ", robot.sensor.analogRead());
  }, 50);
})

.start();
