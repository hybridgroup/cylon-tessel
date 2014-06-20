var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'accel', driver: 'accel-mma84' },

  work: function(my) {
    my.accel.on('error', function (err) {
      console.log(err)
    });

    my.accel.on('data', function (xyz) {
      console.log('x:', xyz[0].toFixed(2),
        'y:', xyz[1].toFixed(2),
        'z:', xyz[2].toFixed(2));
    });
  }
}).start();
