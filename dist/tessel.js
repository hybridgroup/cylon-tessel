/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace, tessel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./cylon-tessel');

  tessel = require('tessel');

  namespace = require('node-namespace');

  namespace('Cylon.Adaptors', function() {
    return this.Tessel = (function(_super) {
      __extends(Tessel, _super);

      function Tessel(opts) {
        if (opts == null) {
          opts = {};
        }
        Tessel.__super__.constructor.apply(this, arguments);
        this.i2cDevices = {};
        this.myself = this;
      }

      Tessel.prototype.commands = function() {
        return ['digitalWrite', 'i2cRead', 'i2cWrite'];
      };

      Tessel.prototype.connect = function(callback) {
        Logger.debug("Connecting to Tessel '" + this.name + "'...");
        callback(null);
        return this.connection.emit('connect');
      };

      Tessel.prototype.disconnect = function() {
        return Logger.debug("Disconnecting from Tessel '" + this.name + "'...");
      };

      Tessel.prototype.isLed = function() {
        if (this.connection.port.port.toUpperCase() === "LED") {
          return true;
        } else {
          return false;
        }
      };

      Tessel.prototype.tesselPort = function() {
        return tessel.port(this.connection.port.port);
      };

      Tessel.prototype.digitalWrite = function(pin, value) {
        var p,
          _this = this;
        p = (function() {
          if (_this.isLed()) {
            return tessel.led(pin).output();
          } else {
            return _this.tesselPort().gpio(pin).output();
          }
        })();
        if (value === 1) {
          return p.high();
        } else {
          return p.low();
        }
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

  /*
      digitalRead: (pin, callback) ->
        p = do ->
          if @isLed
            tessel.led(pin).input()
          else
            @tesselPort().gpio(pin).input()
  
        data = +p.read()
        (callback)(data)
  
      analogRead: (pin, callback) ->
        (callback)(tesselPort().analog[pin].read())
  
      analogWrite: (pin, value) ->
        @tesselPort().analog[pin].write(value)
  */


}).call(this);
