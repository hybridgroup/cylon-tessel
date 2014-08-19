/*
 * ir-attx4 driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var irLib = require('ir-attx4');

var IrAttx4 = module.exports = function () {
  IrAttx4.__super__.constructor.apply(this, arguments);
  this.module = irLib.use(tessel.port(this.connection.port));
  this.setupCommands([
    "sendRawSignal", "setListening"
  ], this.module);
};

Cylon.Utils.subclass(IrAttx4, Cylon.Driver);

IrAttx4.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    ['ready', 'error', 'data'].forEach(function(e){
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });  
    IrAttx4.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
