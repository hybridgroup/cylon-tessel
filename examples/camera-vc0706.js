var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'camera', driver: 'camera-vc0706' },

  work: function(my) {
    my.camera.on('error', function (err) {
      console.log(err)
    });

    my.camera.setCompression(0.4, function(err) {
      console.log("error setting compression: ", err);
    });

    my.camera.takePicture(function(err, image) {
      if (err) {
        console.log('error taking image', err);
      } else {
        // Name the image
        var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
        // Save the image
        console.log('Picture saving as', name, '...');
        process.sendfile(name, image);
        console.log('done.');
        // Turn the camera off to end the script
        my.camera.disable();
      }
    });
  }
}).start();