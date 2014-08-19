/*
 * audio-vs1053b driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var audioLib = require('audio-vs1053b');

var AudioVs1053b = module.exports = function () {
  AudioVs1053b.__super__.constructor.apply(this, arguments);

  this.module = audioLib.use(tessel.port(this.connection.port));

  this.setupCommands([
    "setVolume", "setInput", "setOutput", "startRecording", "stopRecording", "play", "pause", "stop", 
    "createPlayStream", "createRecordStream", "availableRecordingProfiles"
  ], this.module);
};

Cylon.Utils.subclass(AudioVs1053b, Cylon.Driver);

AudioVs1053b.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    var events = [
      'ready', 'error', 'volume', 'input', 'output', 'startRecording', 'data', 
      'stopRecording', 'play', 'pause', 'stop', 'end'
    ];
    events.forEach(function(e) {
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });
    AudioVs1053b.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
