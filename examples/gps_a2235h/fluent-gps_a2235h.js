var cylon = require('cylon');

cylon.robot({
  connection: { name: 'tessel', adaptor: 'tessel', port: 'A' },
  device: { name: 'gps', driver: 'gps-a2235h' }
})

.on('ready', function(robot) {
  var satsInRange = 0;
  var satsFixed = 0;

  console.log('GPS module powered and ready. Waiting for satellites...');

  robot.gps.on('error', function (err) {
    console.log(err);
  });

  // Emit coordinates when we get a coordinate fix
  robot.gps.on('coordinates', function (coords) {
    console.log('Lat:', coords.lat, '\tLon:', coords.lon, '\tTimestamp:', coords.timestamp);
  });

  // Emit altitude when we get an altitude fix
  robot.gps.on('altitude', function (alt) {
    console.log('Got an altitude of', alt.alt, 'meters (timestamp: ' + alt.timestamp + ')');
  });

  // Emitted whenever satellites are in view
  robot.gps.on('satellite-list-partial', function (data) {
    satsInRange = data.satsInView;
    console.log(satsInRange, 'satellites in range,', satsFixed, 'fixed.');
  });

  // Emitted when we have information about a fix on satellites
  robot.gps.on('fix', function (data) {
    satsFixed = data.numSat;
    console.log(satsInRange, 'satellites in range,', satsFixed, 'fixed.');
  });
})

.start();
