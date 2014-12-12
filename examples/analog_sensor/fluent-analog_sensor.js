var Cylon = require('cylon');

Cylon
  .robot()
  .connection('tessel', { adaptor: 'tessel', port: 'GPIO' })
  .device('sensor', { driver: 'analogSensor', pin: "A6" })
  .on('ready', function(bot) {
    setInterval(function() {
      console.log("value: ", bot.sensor.analogRead());
    }, 50);
  });

Cylon.start();
