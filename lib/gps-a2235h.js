/*
 * gps-a2235h driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var gpsLib = require('gps-a2235h');

var GpsA2235h = module.exports = function () {
  GpsA2235h.__super__.constructor.apply(this, arguments);
  this.module = gpsLib.use(tessel.port(this.connection.port));
  this.proxyMethods(this.commands, this.module, this);
};

Cylon.Utils.subclass(GpsA2235h, Cylon.Driver);

GpsA2235h.prototype.commands = [
  "powerOff","powerOn","setCoordinateFormat"
];

GpsA2235h.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    self.defineEvent({ eventName: 'ready', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'error', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'altitude', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'coordinates', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'powerOff', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'powerOn', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'active-satellites', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'fix', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'nav-info', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'satellite-list-partial', source: self.module, target: self.device });
    self.defineEvent({ eventName: 'track-info', source: self.module, target: self.device });
    
    GpsA2235h.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};



