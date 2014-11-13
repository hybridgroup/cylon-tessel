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
  this.module = irLib.use(tessel.port(this.adaptor.port));
  this.setupCommands([
    "sendRawSignal", "setListening"
  ], this.module);
};

Cylon.Utils.subclass(IrAttx4, Cylon.Driver);

IrAttx4.prototype.start = function(callback) {
  this.module.on('ready', function () {
    ['ready', 'error', 'data'].forEach(function(e){
      this.defineEvent({ eventName: e, source: this.module, target: this });
    }.bind(this));

    this.emit('start');

    callback();
  }.bind(this));
};

IrAttx4.prototype.halt = function(callback) {
  callback();
};
