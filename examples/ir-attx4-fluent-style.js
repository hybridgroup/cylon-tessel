var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'ir', driver: 'ir-attx4' }
})

.on('ready', function(robot) {
  robot.ir.on('error', function (err) {
    console.log(err);
  });

  robot.ir.on('data', function(data) {
    console.log("Received RX Data: ", data);
  });

  setInterval(function() {
    /*********************************************
      This infrared module example transmits the
      power signal sequence of an Insignia brand
      television every three seconds, while also
      listening for (and logging) any incoming
      infrared data.
     *********************************************/
    // Make a buffer of on/off durations (each duration is 16 bits)
    var powerBuffer = new Buffer([0, 178, 255, 168, 0, 12, 255, 246, 0, 13, 255, 225, 0, 13, 255, 224, 0, 12, 255, 246, 0, 12, 255, 246, 0, 13, 255, 247, 0, 13, 255, 247, 0, 13, 255, 224, 0, 12, 255, 224, 0, 13, 255, 247, 0, 13, 255, 224, 0, 12, 255, 246, 0, 12, 255, 246, 0, 12, 255, 246, 0, 12, 255, 246, 0, 13, 255, 247, 0, 13, 255, 224, 0, 12, 255, 224, 0, 13, 255, 225, 0, 13, 255, 224, 0, 12, 255, 246, 0, 12, 255, 246, 0, 13, 255, 247, 0, 13, 255, 247, 0, 13, 255, 246, 0, 12, 255, 246, 0, 12, 255, 246, 0, 12, 255, 246, 0, 12, 255, 224, 0, 13, 255, 224, 0, 12, 255, 224, 0, 12, 255, 224, 0, 12]);
    // Send the signal at 38 kHz
    robot.ir.sendRawSignal(38, powerBuffer, function(err) {
      if (err) {
      console.log("Unable to send signal: ", err);
      } else {
      console.log("Signal sent!");
      }
      });
    }, 3000);
})

.start();
