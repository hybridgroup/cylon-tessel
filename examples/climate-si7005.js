var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'climate', driver: 'climate-si7005' },
  work: function(my) {
    my.climate.on('error', function (err) {
      console.log(err)
    });

    every((1).seconds(), function() {
      my.climate.readHumidity(function (err, humid) {
        console.log('Humidity:', humid.toFixed(4) + '%RH');
      });
      my.climate.readTemperature('f', function (err, temp) {
        console.log('Degrees:', temp.toFixed(4) + 'F');
      });
    });
  }
}).start();