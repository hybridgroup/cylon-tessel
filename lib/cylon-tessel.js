/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require("cylon");
var Tessel = require('./tessel');
var GPIO = require("cylon-gpio"),
    I2C = require("cylon-i2c");

var AmbientAttx4 = require('./ambient-attx4');


module.exports = {
  adaptor: function(args) {
    return new Tessel(args);
  },
  driver: function(opts) {
    switch (opts.name) {
      case 'ambient-attx4':
        return new AmbientAttx4(opts);
      default:
        return null;
    }
  },
  register: function(robot) {
    Cylon.Logger.debug("Registering Tessel adaptor for " + robot.name);
    robot.registerAdaptor('cylon-tessel', 'tessel');

    Cylon.Logger.debug("Registering ambient-attx4 Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'ambient-attx4');


    GPIO.register(robot);
    I2C.register(robot);
  }
};
