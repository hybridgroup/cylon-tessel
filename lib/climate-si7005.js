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
var climatesi7005 = require('climate-si7005');

var ClimateSi7005 = module.exports = function () {
  ClimateSi7005.__super__.constructor.apply(this, arguments);
  this.module = climatesi7005.use(tessel.port(this.connection.port));
  this.proxyMethods(this.commands, this.module, this);
};

Cylon.Utils.subclass(ClimateSi7005, Cylon.Driver);

ClimateSi7005.prototype.commands = [
  "readTemperature","readHumidity","setHeater","setFastMeasure",
];

ClimateSi7005.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    self.defineEvent({ eventName: 'ready', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'error', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'temperature', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'humidity', source: self.module, target: self.device });
    
    ClimateSi7005.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};

