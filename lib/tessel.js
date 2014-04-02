/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var tessel = require('tessel'),
    namespace = require('node-namespace');

namespace("Cylon.Adaptors", function() {
  this.Tessel= (function(klass) {
    subclass(Tessel, klass);

    function Tessel(opts) {
      if (opts == null) { opts = {}; }

      Tessel.__super__.constructor.apply(this, arguments);

      this.myself = this;
      this.i2cReady = false;
      this.i2cDevices = {};
    }

    Tessel.prototype.commands = function() {
      return ['digitalWrite', 'digitalRead', 'i2cRead', 'i2cWrite'];
    };

    Tessel.prototype.connect = function(callback) {
      Logger.debug("Connecting to Tessel '" + this.name + "'...");
      Tessel.__super__.connect.apply(this, arguments);
      return this.proxyMethods(this.commands, this.board, this.myself);
    };

    Tessel.prototype.disconnect = function() {
      return Logger.debug("Disconnecting from Tessel '" + this.name + "'...");
    };

    Tessel.prototype.isLed = function() {
      if (this.connection.port.toUpperCase() === "LED") {
        return true;
      } else {
        return false;
      }
    };

    Tessel.prototype.tesselPort = function() {
      return tessel.port(this.connection.port);
    };

    Tessel.prototype.digitalWrite = function(pin, value) {
      var p,
        _this = this;
      p = (function() {
        if (_this.isLed()) {
          tessel.led(pin).output();
          return tessel.led(pin);
        } else {
          _this.tesselPort().gpio(pin).output();
          return _this.tesselPort().gpio(pin);
        }
      })();
      if (value === 1) {
        return p.high();
      } else {
        return p.low();
      }
    };

    Tessel.prototype.digitalRead = function(pin, callback) {
      var data, p, prev_data,
        _this = this;
      data = null;
      prev_data = null;
      p = (function() {
        if (_this.isLed()) {
          tessel.led(pin).input();
          return tessel.led(pin);
        } else {
          _this.tesselPort().gpio(pin).input();
          return _this.tesselPort().gpio(pin);
        }
      })();
      return every(0, function() {
        data = p.read();
        if (data !== prev_data) {
          prev_data = data;
          return callback(data);
        }
      });
    };

    Tessel.prototype.i2cWrite = function(address, cmd, buff, callback) {
      if (callback == null) {
        callback = null;
      }
      buff = buff != null ? buff : [];
      cmd = cmd instanceof Array ? cmd : [cmd];
      return this.i2cDevice(address).send(cmd.concat(buff), callback);
    };

    Tessel.prototype.i2cRead = function(address, cmd, length, callback) {
      if (callback == null) {
        callback = null;
      }
      cmd = cmd instanceof Array ? cmd : [cmd];
      return this.i2cDevice(address).transfer(cmd, length, function(err, data) {
        return callback(data);
      });
    };

    Tessel.prototype.i2cDevice = function(address) {
      if (this.i2cDevices[address] === null) {
        this.i2cDevices[address] = this.tesselPort().I2C(address);
        this.i2cDevices[address].initialize();
      }
      return this.i2cDevices[address];
    };

    return Tessel;

  })(Cylon.Adaptor);
});