/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require("cylon");

var GPIO = require("cylon-gpio"),
    I2C = require("cylon-i2c");

var Tessel = require('./tessel');

module.exports = {
  adaptor: function(args) {
    return new Tessel(args);
  },

  driver: function(args) {
    return GPIO.driver.apply(GPIO, args) || I2C.driver.apply(I2C, args);
  },

  register: function(robot) {
    Cylon.Logger.debug("Registering Tessel adaptor for " + robot.name);
    robot.registerAdaptor('cylon-tessel', 'tessel');

    GPIO.register(robot);
    I2C.register(robot);
  }
};
