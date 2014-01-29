var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel'},
  device: {name: 'led', driver: 'led', pin: 2},

  work: function(my) {
    console.log("toggle");
    my.led.toggle();
    console.log("toggle");
    my.led.toggle();
    console.log("toggle");
    my.led.toggle();
    console.log("toggle");
    my.led.toggle();
    console.log("toggle");
    my.led.toggle();
  }
}).start();
