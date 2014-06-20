var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'ble', driver: 'ble-ble113a' },

  work: function(my) {
    my.ble.on('error', function (err) {
      console.log(err)
    });

    my.ble.on('discover', function(peripheral) {
      console.log("Discovered peripheral!", peripheral.toString());
    });

    after((2).seconds, function() {
      console.log("scanning...");
      my.ble.startScanning();
    });
  }
}).start();