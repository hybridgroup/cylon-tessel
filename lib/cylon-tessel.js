/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Tessel = require('./tessel');

var Drivers = {
  'accel-mma84':    require('./accel-mma84'),
  'ambient-attx4':  require('./ambient-attx4'),
  'camera-vc0706':  require('./camera-vc0706'),
  'climate-si7005': require('./climate-si7005'),
  'gps-a2235h':     require('./gps-a2235h'),
  'servo-pca9685':  require('./servo-pca9685'),
  'audio-vs1053b':  require('./audio-vs1053b'),
  'relay-mono':     require('./relay-mono'),
  'ir-attx4':       require('./ir-attx4'),
  'ble-ble113a':    require('./ble-ble113a'),
}

module.exports = {
  adaptors: ['tessel'],
  drivers: Object.keys(Drivers),
  dependencies: ['cylon-gpio', 'cylon-i2c'],

  adaptor: function(args) {
    return new Tessel(args);
  },

  driver: function(opts) {
    for (var driver in Drivers) {
      if (opts.driver === driver) {
        return Drivers[driver](opts);
      }
    }

    return null;
  }
};
