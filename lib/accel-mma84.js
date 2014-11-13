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

  this.module = accelLib.use(tessel.port(this.adaptor.port));

  this.setupCommands([
    "availableOutputRates", "availableScaleRanges", "enableDataInterrupts", "getAcceleration",
    "setOutputRate", "setScaleRange"
  ], this.module);
};

Cylon.Utils.subclass(AccelMma84, Cylon.Driver);

AccelMma84.prototype.start = function(callback) {
  this.module.on('ready', function () {
    ['ready', 'error', 'data'].forEach(function(e){
      this.defineEvent({ eventName: e, source: this.module, target: this });
    }.bind(this));

    this.emit('start');

    callback();
  }.bind(this));
};

AccelMma84.prototype.halt = function(callback) {
  callback();
};
