/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var tessel = require('tessel'),
    Cylon = require('cylon');

var Tessel = module.exports = function Tessel(opts) {
  if (opts == null) { opts = {}; }

  Tessel.__super__.constructor.apply(this, arguments);

  this.myself = this;
  this.i2cReady = false;
  this.i2cDevices = {};
};

Cylon.Utils.subclass(Tessel, Cylon.Adaptor);

Tessel.prototype.commands = [
  'digitalWrite', 'digitalRead', 'analogRead', 'pwmWrite', 'i2cRead', 'i2cWrite'
];

Tessel.prototype.connect = function(callback) {
  Cylon.Logger.debug("Connecting to Tessel '" + this.name + "'...");
  Tessel.__super__.connect.apply(this, arguments);
  return this.proxyMethods(this.commands, this.board, this.myself);
};

Tessel.prototype.disconnect = function() {
  return Cylon.Logger.debug("Disconnecting from Tessel '" + this.name + "'...");
};

Tessel.prototype._hasPort = function() {
  if (this.connection.port){
    return true;
  }
  return false;
};

Tessel.prototype._tesselPort = function() {
  return tessel.port(this.connection.port);
};

Tessel.prototype._tesselPin = function(pin) {
  if (this._hasPort()) {
    return this._tesselPort().pin[pin];
  }
  return tessel.led[pin];
};

Tessel.prototype.digitalWrite = function(pin, value) {
  if (value === 1) {
    this._tesselPin(pin).write(1);
  } else {
    this._tesselPin(pin).write(0);
  }
};

Tessel.prototype.pwmWrite = function(pin, value) {
  this._tesselPort().pwmFrequency(100);
  this._tesselPin(pin).pwmDutyCycle(value);
};

Tessel.prototype.analogRead = function(pin, callback) {
  var data,
    prev_data,
    _this = this;
  data = null;
  prev_data = null;
  Cylon.Utils.every(0, function() {
    data = _this._tesselPin(pin).read() * _this._tesselPin(pin).resolution;
    if (data !== prev_data) {
      prev_data = data;
      callback(data);
    }
  });
};

Tessel.prototype.digitalRead = function(pin, callback) {
  var data,
    prev_data,
    _this = this;
  data = null;
  prev_data = null;
  if (this._hasPort()) {
    Cylon.Utils.every(0, function() {
      data = _this._tesselPin(pin).read();
      if (data !== prev_data) {
        prev_data = data;
        callback(data);
      }
    });
  } else {
    tessel.button.on('press', function(d) {
      callback(1);
    });
    tessel.button.on('release', function(d) {
      callback(0);
    });
  }
};

Tessel.prototype.i2cWrite = function(address, cmd, buff, callback) {
  buff = buff != null ? buff : [];
  cmd = cmd instanceof Array ? cmd : [cmd];
  return this.i2cDevice(address).send(new Buffer(cmd.concat(buff)), callback);
};

Tessel.prototype.i2cRead = function(address, cmd, length, callback) {
  var _this = this;
  cmd = cmd instanceof Array ? cmd : [cmd];
  return this.i2cDevice(address).send(new Buffer(cmd), function(err){
    if (err) {
      callback(err)
    } else {
      _this.i2cDevice(address).receive(length, function(err, data) {
        callback(err, data);
      })
    }
  });
};

Tessel.prototype.i2cDevice = function(address) {
  if (this.i2cDevices[address] === null) {
    var port = this._tesselPort();
    this.i2cDevices[address] = new port.I2C(address);
  }
  return this.i2cDevices[address];
};
