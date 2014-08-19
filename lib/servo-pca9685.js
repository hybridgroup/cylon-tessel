/*
 * accel-mma84 driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var servoLib = require('servo-pca9685');

var ServoPca9685 = module.exports = function () {
  ServoPca9685.__super__.constructor.apply(this, arguments);
  this.module = servoLib.use(tessel.port(this.connection.port));
  this.setupCommands([
    "configure", "move", "read", "setDutyCycle", "setModuleFrequency"
  ], this.module);
};

Cylon.Utils.subclass(ServoPca9685, Cylon.Driver);

ServoPca9685.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
     ['ready', 'error'].forEach(function(e) {
       self.defineEvent({ eventName: e, source: self.module, target: self.device });
     }); 
    ServoPca9685.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
