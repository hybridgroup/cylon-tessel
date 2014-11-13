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
  this.module = gpsLib.use(tessel.port(this.adaptor.port));
  this.setupCommands([
    "powerOff", "powerOn", "setCoordinateFormat"
  ], this.module);
};

Cylon.Utils.subclass(GpsA2235h, Cylon.Driver);

GpsA2235h.prototype.start = function(callback) {
  this.module.on('ready', function () {
    var events = [
      'ready', 'error', 'altitude', 'coordinates', 'powerOff', 'powerOn', 'active-satellites',
      'fix', 'nav-info', 'satellite-list-partial', 'track-info'
    ];

    events.forEach(function(e){
      this.defineEvent({ eventName: e, source: this.module, target: this });
    }.bind(this));

    this.emit('start');

    callback();
  }.bind(this));
};

GpsA2235h.prototype.halt = function(callback) {
  callback();
};
