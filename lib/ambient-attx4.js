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
var ambientLib = require('ambient-attx4');

var AmbientAttx4 = module.exports = function () {
  AmbientAttx4.__super__.constructor.apply(this, arguments);

  this.module = ambientLib.use(tessel.port(this.connection.port));

  this.setupCommands([
    "clearLightTrigger", "clearSoundTrigger", "getLightBuffer", "getLightLevel", "getSoundBuffer",
    "getSoundLevel", "setLightTrigger", "setSoundTrigger"
  ], this.module);
};

Cylon.Utils.subclass(AmbientAttx4, Cylon.Driver);

AmbientAttx4.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    ['ready', 'error', 'light', 'light-trigger','sound', 'sound-trigger'].forEach(function(e){
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });
    AmbientAttx4.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
