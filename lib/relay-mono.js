/*
 * relay-mono driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var relayLib = require('relay-mono');

var RelayMono = module.exports = function () {
  RelayMono.__super__.constructor.apply(this, arguments);
  this.module = relayLib.use(tessel.port(this.connection.port));
  this.setupCommands([
    "getState", "toggle", "turnOff", "turnOn"
  ], this.module);
};

Cylon.Utils.subclass(RelayMono, Cylon.Driver);

RelayMono.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    ['ready', 'error', 'latch'].forEach(function(e) {
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });
    RelayMono.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
