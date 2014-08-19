/*
 * ble-ble113a driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var tessel = require('tessel');
var bleLib = require('ble-ble113a');

var BleBle113a = module.exports = function () {
  BleBle113a.__super__.constructor.apply(this, arguments);
  this.module = bleLib.use(tessel.port(this.connection.port));
  this.setupCommands([
    "gettProfile",
    // Master Commands
    "startScanning",
    "stopScanning",
    "connect",
    "disconnect",
    "discoverServices",
    "discoverAllServices",
    "discoverIncludedServices",
    "discoverCharacteristics",
    "discoverAllCharacteristics",
    "discoverAllServicesAndCharacteristics",
    "discoverCharacteristicsOfService",
    "discoverAllCharacteristicsOfService",
    "discoverDescriptorsOfCharacteristic",
    "discoverAllAttributes",
    "read",
    "write",
    "readDescriptor",
    "writeDescriptor",
    "startNotifications",
    "stopNotifications",
    "startIndications",
    "stopIndications",
    "updateRSSI",
    "reset",
    // Slave Commands
    "startAdvertising",
    "stopAdvertising",
    "setAdvertisingData",
    "writeLocalValue",
    "readLocalValue",
    "sendReadResponse",
    "maxNumValues",
    // Security Commands
    "setBondable",
    "getBonds",
    "deleteBonds",
    "startEncryption",
    "enterPasskey",
    "setEncryptionKeySize",
    "setOOBData",
    "enableMITMProtection",
    // System Commands
    "getBluetoothAddress",
    "getMaxConnections",
    "reset" 
  ], this.module);
};

Cylon.Utils.subclass(BleBle113a, Cylon.Driver);

BleBle113a.prototype.gattProfile = function() {
  return bleLib.gatt_profile
}

BleBle113a.prototype.start = function(callback) {
  var self = this;
  var args = arguments;

  self.module.on('ready', function () {
    var events = [
      // Master Events
      'error',
      'scanStart',
      'scanStop',
      'discover',
      'connect',
      'disconnect',
      'servicesDiscover',
      'characteristicsDiscover',
      'descriptorsDiscover',
      'characteristicRead',
      'characteristicWrite',
      'descriptorRead',
      'descriptorWrite',
      'notification',
      'indication',
      'rssiUpdate',
      // Slave Events
      'startAdvertising',
      'stopAdvertising',
      'connect',
      'disconnect',
      'remoteWrite',
      'remoteReadRequest',
      'remoteNotification',
      'remoteIndication',
      'remoteUpdateStop',
      'indicated'
    ];
    events.forEach(function(e){
      self.defineEvent({ eventName: e, source: self.module, target: self.device });
    });  
    BleBle113a.__super__.start.apply(self, args);
    self.device.emit('start');
  });
};
