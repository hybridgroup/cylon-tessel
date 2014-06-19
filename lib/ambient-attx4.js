/*
 * ambient-attx4 driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var AmbientAttx4 = module.exports = function () {
  AmbientAttx4.__super__.constructor.apply(this, arguments);
  this.ambient = ambientlib.use(tessel.port(this.connection.port));
  this.proxyMethods(this.commands, this.ambient, this);

};

Cylon.Utils.subclass(AmbientAttx4, Cylon.Driver);

AmbientAttx4.prototype.commands = [
  "clearLightTrigger","clearSoundTrigger","getLightBuffer","getLightLevel","getSoundBuffer"
  ,"getSoundLevel","setLightTrigger","setSoundTrigger",
];

AmbientAttx4.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.ambient.on('ready', function () {
    self.defineEvent({ eventName: 'ready', source: self.ambient, target: self.device });
    self.defineEvent({ eventName: 'error', source: self.ambient, target: self.device });
    self.defineEvent({ eventName: 'light', source: self.ambient, target: self.device });
    self.defineEvent({ eventName: 'light-trigger', source: self.ambient, target: self.device });
    self.defineEvent({ eventName: 'sound', source: self.ambient, target: self.device });
    self.defineEvent({ eventName: 'sound-trigger', source: self.ambient, target: self.device });
    
    AmbientAttx4.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};