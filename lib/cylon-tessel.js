/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Tessel = require("./tessel"),
    Driver = require("./driver");

module.exports = {
  adaptors: ["tessel"],

  drivers: [
    "accel-mma84",
    "ambient-attx4",
    "camera-vc0706",
    "climate-si7005",
    "climate-si7020",
    "gps-a2235h",
    "servo-pca9685",
    "audio-vs1053b",
    "relay-mono",
    "ir-attx4",
    "ble-ble113a"
  ],

  dependencies: ["cylon-gpio", "cylon-i2c"],

  adaptor: function(args) {
    return new Tessel(args);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
