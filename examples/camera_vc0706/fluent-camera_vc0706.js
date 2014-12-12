var cylon = require('cylon');

cylon.robot({
  connections: [
    { name: 'tessel', adaptor: 'tessel' },
    { name: 'tessel_A', adaptor: 'tessel', port: 'A' },
  ],
  devices: [
    { name: 'led', driver: 'led', pin: 1, connection: 'tessel' },
    { name: 'button', driver: 'button', pin: 'config', connection: 'tessel' },
    { name: 'camera', driver: 'camera-vc0706', connection: 'tessel_A' },
  ]
})

.on('ready', function(robot) {
  robot.camera.on('error', function (err) {
    console.log("Camera error: ", err);
  });

  robot.camera.setCompression(0.4, function(err) {
    if (err) {
      console.log("error setting compression: ", err);
    }
  });

  robot.button.on('push', function() {
    robot.led.turnOn();
    robot.camera.takePicture(function(err, image) {
      if (err) {
        console.log('error taking image', err);
      } else {
        // Name the image
        var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
        // Save the image
        console.log('Picture saving as', name, '...');
        process.sendfile(name, image);
      }
      robot.led.turnOff();
    });
  });
})

.start();
