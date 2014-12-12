var Cylon = require('cylon');

Cylon
  .robot()
  .connection('tessel', { adaptor: 'tessel', port: 'A' })
  .device('relay', { driver: 'relay-mono' })
  .on('ready', function(bot) {
    bot.relay.on('error', function (err) {
      console.log(err);
    });

    bot.relay.on('latch', function(channel, value) {
      console.log('latch on relay channel ' + channel + ' switched to', value);
    });

    setInterval(function() {
      // Toggle relay channel 1
      bot.relay.toggle(1, function toggleOneResult(err) {
        if (err) {
          console.log("Err toggling 1", err);
        }
      });

      // Toggle relay channel 2
      bot.relay.toggle(2, function toggleTwoResult(err) {
        if (err) {
          console.log("Err toggling 2", err);
        }
      });
    }, 2000);
  });

Cylon.start();
