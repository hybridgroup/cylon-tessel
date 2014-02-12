/*
 * cylon-tessel
 * http://cylonjs.com
 *
 * Copyright (c) 2013 Your Name Here
 * Your License Here
*/


(function() {
  'use strict';
  var GPIO, I2C, namespace,
    __slice = [].slice;

  namespace = require('node-namespace');

  require('cylon');

  require('./tessel');

  GPIO = require("cylon-gpio");

  I2C = require("cylon-i2c");

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Cylon.Adaptors.Tessel, args, function(){});
    },
    driver: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return GPIO.driver.apply(GPIO, args) || I2C.driver.apply(I2C, args);
    },
    register: function(robot) {
      robot.registerAdaptor('cylon-tessel', 'tessel');
      I2C.register(robot);
      return GPIO.register(robot);
    }
  };

}).call(this);
