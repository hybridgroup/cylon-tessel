var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'accel', driver: 'accel-mma84' }
})

.on('ready', function(robot) {
  robot.accel.on('error', function (err) {
    console.log(err);
  });

  robot.accel.on('data', function (xyz) {
    console.log('x:', xyz[0].toFixed(2),
                'y:', xyz[1].toFixed(2),
                'z:', xyz[2].toFixed(2));
  });
})

.start();
