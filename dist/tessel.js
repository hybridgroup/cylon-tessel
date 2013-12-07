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

  tessel = require('tessel');

  namespace = require('node-namespace');

  namespace("Cylon.Adaptor", function() {
    return this.Tessel = (function(_super) {
      __extends(Tessel, _super);

      function Tessel(opts) {
        Tessel.__super__.constructor.apply(this, arguments);
        this.connection = opts.connection;
        this.name = opts.name;
        this.myself = this;
      }

      Tessel.prototype.commands = function() {
        return ['digitalWrite'];
      };

      Tessel.prototype.connect = function(callback) {
        Logger.debug("Connecting to Tessel '" + this.name + "'...");
        callback(null);
        return this.connection.emit('connect');
      };

      Tessel.prototype.disconnect = function() {
        return Logger.debug("Disconnecting from Tessel '" + this.name + "'...");
      };

      Tessel.prototype.digitalWrite = function(pin, value) {
        var p;
        p = tessel.led(pin).output();
        if (value === 1) {
          return p.high();
        } else {
          return p.low();
        }
      };

      return Tessel;

    })(Cylon.Basestar);
  });

  module.exports = Cylon.Adaptor.Tessel;

}).call(this);
