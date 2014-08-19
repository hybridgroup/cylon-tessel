/*
 * camera-vc0706 driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var cameraLib = require('camera-vc0706');

var CameraVc0706 = module.exports = function () {
  CameraVc0706.__super__.constructor.apply(this, arguments);
  this.module = cameraLib.use(tessel.port(this.connection.port));
  this.setupCommands([
    "resolutions", "disable", "setCompression", "setResolution", "takePicture"
  ], this.module);
};

Cylon.Utils.subclass(CameraVc0706, Cylon.Driver);

CameraVc0706.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    ['ready', 'error', 'compression', 'resolution', 'picture'].forEach(function(e){
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });
    CameraVc0706.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
