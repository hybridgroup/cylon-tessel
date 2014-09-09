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
  this.module.on('ready', function () {
    ['ready', 'error', 'light', 'light-trigger','sound', 'sound-trigger'].forEach(function(e){
      this.defineEvent({ eventName: e, source: this.module, target: this.device });
    }.bind(this));

    this.device.emit('start');

    callback();
  }.bind(this));
};

AmbientAttx4.prototype.halt = function(callback) {
  callback();
};
