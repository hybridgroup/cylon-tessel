var Cylon = require('cylon');

Cylon
  .robot()
  .connection('tessel', { adaptor: 'tessel', port: 'A' })
  .device('ble', { driver: 'ble-ble113a' })
  .on('ready', function(bot) {
    bot.ble.on('error', console.log);

    bot.ble.on('discover', function(peripheral) {
      console.log("Discovered peripheral!", peripheral.toString());
    });

    setTimeout(function() {
      console.log("scanning...");
      bot.ble.startScanning();
    }, 2000);
  });

Cylon.start();
