var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'relay', driver: 'relay-mono' }
})

.on('ready', function(robot) {
  robot.relay.on('error', function (err) {
    console.log(err);
  });

  robot.relay.on('latch', function(channel, value) {
    console.log('latch on relay channel ' + channel + ' switched to', value);
  });

  setInterval(function() {
    // Toggle relay channel 1
    robot.relay.toggle(1, function toggleOneResult(err) {
      if (err) {
        console.log("Err toggling 1", err);
      }
    });
    // Toggle relay channel 2
    robot.relay.toggle(2, function toggleTwoResult(err) {
      if (err) {
        console.log("Err toggling 2", err);
      }
    });
  }, 2000);
})

.start();
