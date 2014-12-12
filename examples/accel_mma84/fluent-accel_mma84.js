var Cylon = require('cylon');

Cylon
  .robot()
  .connection('tessel', { adaptor: 'tessel', port: 'A' })
  .device('accel', { driver: 'accel-mma84' })
  .on('ready', function(bot) {
    bot.accel.on('error', console.log);

    bot.accel.on('data', function (xyz) {
      console.log('x:', xyz[0].toFixed(2),
                  'y:', xyz[1].toFixed(2),
                  'z:', xyz[2].toFixed(2));
    });
  });

Cylon.start();
