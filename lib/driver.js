/**
 * Tessel Driver Support
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2015 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon"),
    Tessel = require("tessel");

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);

  var driver = require("./modules/" + opts.driver);

  this.driver = opts.driver;

  this.commands = driver.commands || [];
  this.events = driver.events || [];
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  this.module = require(this.driver).use(Tessel.port[this.connection.port]);

  this.setupCommands(this.commands, this.module);

  this.module.on("ready", function() {
    this.events.forEach(function(event) {
      this.defineEvent({ eventName: event, source: this.module, target: this });
    }.bind(this));
  }.bind(this));

  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};
