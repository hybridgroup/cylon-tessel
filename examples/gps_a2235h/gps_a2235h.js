var Cylon = require('cylon');

Cylon.robot({
  connections: {
    tessel: { adaptor: 'tessel', port: 'A' }
  },

  devices: {
    gps: { driver: 'gps-a2235h' }
  },

  work: function(my) {
    var satsInRange = 0;
    var satsFixed = 0;

    console.log('GPS module powered and ready. Waiting for satellites...');

    my.gps.on('error', function (err) {
      console.log(err);
    });

    // Emit coordinates when we get a coordinate fix
    my.gps.on('coordinates', function (coords) {
      console.log('Lat:', coords.lat, '\tLon:', coords.lon, '\tTimestamp:', coords.timestamp);
    });

    // Emit altitude when we get an altitude fix
    my.gps.on('altitude', function (alt) {
      console.log('Got an altitude of', alt.alt, 'meters (timestamp: ' + alt.timestamp + ')');
    });

    // Emitted whenever satellites are in view
    my.gps.on('satellite-list-partial', function (data) {
      satsInRange = data.satsInView;
      console.log(satsInRange, 'satellites in range,', satsFixed, 'fixed.');
    });

    // Emitted when we have information about a fix on satellites
    my.gps.on('fix', function (data) {
      satsFixed = data.numSat;
      console.log(satsInRange, 'satellites in range,', satsFixed, 'fixed.');
    });
  }
}).start();
