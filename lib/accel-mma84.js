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
var accelLib = require('accel-mma84');

var AccelMma84 = module.exports = function () {
  AccelMma84.__super__.constructor.apply(this, arguments);

  this.module = accelLib.use(tessel.port(this.connection.port));

  this.setupCommands([
    "availableOutputRates", "availableScaleRanges", "enableDataInterrupts", "getAcceleration",
    "setOutputRate", "setScaleRange"
  ], this.module);
};

Cylon.Utils.subclass(AccelMma84, Cylon.Driver);

AccelMma84.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    ['ready', 'error', 'data'].forEach(function(e){
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });  
    AccelMma84.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
