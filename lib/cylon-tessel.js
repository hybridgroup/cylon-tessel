/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require("cylon");
var GPIO = require("cylon-gpio"),
    I2C = require("cylon-i2c");

var Tessel = require('./tessel');
var AccelMma84 = require('./accel-mma84');
var AmbientAttx4 = require('./ambient-attx4');
var CameraVc0706 = require('./camera-vc0706');
var ClimateSi7005 = require('./climate-si7005');
var GpsA2235h = require('./gps-a2235h');
var ServoPca9685 = require('./servo-pca9685');
var AudioVs1053b = require('./audio-vs1053b');
var RelayMono = require('./relay-mono');
var IrAttx4 = require('./ir-attx4');
var BleBle113a = require('./ble-ble113a');

module.exports = {
  adaptor: function(args) {
    return new Tessel(args);
  },
  driver: function(opts) {
    switch (opts.name) {
      case 'accel-mma84':
        return new AccelMma84(opts);
      case 'ambient-attx4':
        return new AmbientAttx4(opts);
      case 'camera-vc0706':
        return new CameraVc0706(opts);
      case 'climate-si7005':
        return new ClimateSi7005(opts);
      case 'gps-a2235h':
        return new GpsA2235h(opts);
      case 'servo-pca9685':
        return new ServoPca9685(opts);
      case 'audio-vs1053b':
        return new AudioVs1053b(opts);
      case 'relay-mono':
        return new RelayMono(opts);
      case 'ir-attx4':
        return new IrAttx4(opts);
      case 'ble-ble113a':
        return new BleBle113a(opts);
      default:
        return null;
    }
  },
  register: function(robot) {
    Cylon.Logger.debug("Registering Tessel adaptor for " + robot.name);
    robot.registerAdaptor('cylon-tessel', 'tessel');

    Cylon.Logger.debug("Registering ambient-attx4 Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'ambient-attx4');

    Cylon.Logger.debug("Registering accel-mma84 Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'accel-mma84');

    Cylon.Logger.debug("Registering audio-vs1053b Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'audio-vs1053b');

    Cylon.Logger.debug("Registering camera-vc0706 Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'camera-vc0706');

    Cylon.Logger.debug("Registering climate-si7005 Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'climate-si7005');

    Cylon.Logger.debug("Registering gps-a2235h Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'gps-a2235h');

    Cylon.Logger.debug("Registering servo-pca9685 Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'servo-pca9685');

    Cylon.Logger.debug("Registering relay-mono Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'relay-mono');

    Cylon.Logger.debug("Registering ir-attx4 Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'ir-attx4');

    Cylon.Logger.debug("Registering ble-ble113a Driver for " + robot.name);
    robot.registerDriver('cylon-tessel', 'ble-ble113a');

    GPIO.register(robot);
    I2C.register(robot);
  }
};
