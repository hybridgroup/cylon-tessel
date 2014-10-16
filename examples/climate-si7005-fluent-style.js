var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'climate', driver: 'climate-si7005' }
})

.on('ready', function(robot) {
  robot.climate.on('error', function (err) {
    console.log(err);
  });

  setInterval(function() {
    robot.climate.readHumidity(function (err, humid) {
      console.log('Humidity:', humid.toFixed(4) + '%RH');
    });
    robot.climate.readTemperature('f', function (err, temp) {
      console.log('Degrees:', temp.toFixed(4) + 'F');
    });
  }, 1000);
})

.start();
