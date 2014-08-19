/*
 * climate-si70054 driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var climateLib = require('climate-si7005');

var ClimateSi7005 = module.exports = function () {
  ClimateSi7005.__super__.constructor.apply(this, arguments);
  this.module = climateLib.use(tessel.port(this.connection.port));
  this.setupCommands([
    "readTemperature", "readHumidity", "setHeater", "setFastMeasure"
  ], this.module);
};

Cylon.Utils.subclass(ClimateSi7005, Cylon.Driver);

ClimateSi7005.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    ['ready', 'error', 'temperature', 'humidity'].forEach(function(e){
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });
    ClimateSi7005.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
