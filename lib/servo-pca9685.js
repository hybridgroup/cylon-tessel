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
  this.module.on('ready', function () {
     ['ready', 'error'].forEach(function(e) {
       this.defineEvent({ eventName: e, source: this.module, target: this });
     }.bind(this));

    this.emit('start');

    callback();
  }.bind(this));
};

ServoPca9685.prototype.halt = function(callback) {
  callback();
};
