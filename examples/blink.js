var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel'},
  device: {name: 'led', driver: 'led', pin: 2},

  work: function(my) {
    every("1000", function() {my.led.toggle()});
  }
}).start();
