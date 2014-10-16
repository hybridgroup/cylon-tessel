var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'ambient', driver: 'ambient-attx4' }
})

.on('ready', function(robot) {
  robot.ambient.on('error', function (err) {
    console.log(err);
  });

  robot.ambient.on('light', function (data) {
    console.log('Light stream: ' + data);
  });

  robot.ambient.on('sound', function (data) {
    console.log('Sound stream: ' + data);
  });

  setInterval(function() {
    robot.ambient.getLightLevel(function(err, data) {
      console.log('Current Light level: ' + data);
    });
    robot.ambient.getSoundLevel(function(err, data) {
      console.log('Current Sound level:  ' + data);
    });
  }, 1000);
})

.start();
