var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'ble', driver: 'ble-ble113a' }
})

.on('ready', function(robot) {
  robot.ble.on('error', function (err) {
    console.log(err);
  });

  robot.ble.on('discover', function(peripheral) {
    console.log("Discovered peripheral!", peripheral.toString());
  });

  setTimeout(function() {
    console.log("scanning...");
    robot.ble.startScanning();
  }, 2000);
})

.start();
