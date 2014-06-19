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
var accelmma84 = require('accel-mma84');

var AccelMma84 = module.exports = function () {
  AccelMma84.__super__.constructor.apply(this, arguments);
  this.module = accelmma84.use(tessel.port(this.connection.port));
  this.proxyMethods(this.commands, this.module, this);
};

Cylon.Utils.subclass(AccelMma84, Cylon.Driver);

AccelMma84.prototype.commands = [
  "availableOutputRates","availableScaleRanges","enableDataInterrupts","getAcceleration","setOutputRate","setScaleRange"
];

AccelMma84.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    self.defineEvent({ eventName: 'ready', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'error', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'data', source: self.module, target: self.device });
    
    AccelMma84.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};




