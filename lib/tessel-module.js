/*
 * generic tessel module driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var initModule = function(name, port) {
  return require(name).use(Tessel.port[port]);
}

var initEvents = function(events, device, callback) {
  device.module.on('ready', function () {
    events.forEach(function(e){
      device.defineEvent({ eventName: e, source: device.module, target: device});
    });
    callback();
  });
}

var Cylon = require('cylon');
var Tessel = require('tessel');
var modules = {
  'accel-mma84': {
    init: function(port) {
      return initModule('accel-mma84', port);
    },
    start: function(device, callback) {
      initEvents(['ready', 'error', 'data'], device, callback);
    },
    commands: [ 
      "availableOutputRates", "availableScaleRanges", "enableDataInterrupts", 
      "getAcceleration", "setOutputRate", "setScaleRange"
    ]
  },
  'ambient-attx4':{
    init: function(port) {
      return initModule('ambient-attx4', port);
    },
    start: function(device, callback) {
      initEvents(
        ['ready', 'error', 'light', 'light-trigger','sound', 'sound-trigger'],
        device,
        callback
      )
    },
    commands: [
      "clearLightTrigger", "clearSoundTrigger", "getLightBuffer", 
      "getLightLevel", "getSoundBuffer", "getSoundLevel", 
      "setLightTrigger", "setSoundTrigger"
    ]
  },
  'camera-vc0706':{
    init: function(port) {
      return initModule('camera-vc0706', port);
    },
    start: function(device, callback) {
      initEvents(
        ['ready', 'error', 'compression', 'resolution', 'picture'],
        device,
        callback
      );
    },
    commands: [
      "resolutions", "disable", "setCompression", "setResolution", "takePicture"
    ]
  },
  'climate-si7005':{
    init: function(port) {
      return initModule('climate-si7005', port);
    },
    start: function(device, callback) {
      initEvents(['ready', 'error', 'temperature', 'humidity'], device, callback);
    },
    commands: [
      "readTemperature", "readHumidity", "setHeater", "setFastMeasure"
    ]
  },
  'gps-a2235h':{
    init: function(port) {
      return initModule('gps-a2235h', port);
    },
    start: function(device, callback) {
      initEvents(
        [
          'ready', 'error', 'altitude', 'coordinates', 'powerOff', 
          'powerOn', 'active-satellites','fix', 'nav-info', 
          'satellite-list-partial', 'track-info'
        ],
        device,
        callback
      );
    },
    commands: [
      "powerOff", "powerOn", "setCoordinateFormat"
    ]
  },
  'servo-pca9685':{
    init: function(port) {
      return initModule('servo-pca9685', port);
    },
    start: function(device, callback) {
      initEvents(['ready', 'error'], device, callback);
    },
    commands: [
      "configure", "move", "read", "setDutyCycle", "setModuleFrequency"
    ]
  },
  'audio-vs1053b':{
    init: function(port) {
      return initModule('audio-vs1053b', port);
    },
    start: function(device, callback) {
      initEvents(
        [
          'ready', 'error', 'volume', 'input', 'output', 'startRecording', 
          'data', 'stopRecording', 'play', 'pause', 'stop', 'end'
        ], 
        device, 
        callback
      );
    },
    commands: [
      "setVolume", "setInput", "setOutput", "startRecording", "stopRecording", 
      "play", "pause", "stop", "createPlayStream", "createRecordStream", 
      "availableRecordingProfiles"
    ]
  },
  'relay-mono':{
    init: function(port) {
      return initModule('relay-mono', port);
    },
    start: function(device, callback) {
      initEvents(['ready', 'error', 'latch'], device, callback);
    },
    commands: [ "getState", "toggle", "turnOff", "turnOn" ]
  },
  'ir-attx4':{
    init: function(port) {
      return initModule('ir-attx4', port);
    },
    start: function(device, callback) {
      initEvents(['ready', 'error', 'data'], device, callback);
    },
    commands: [ "sendRawSignal", "setListening" ]
  },
  'ble-ble113a':{
    init: function(port) {
      return initModule('ble-ble113a', port);
    },
    start: function(device, callback) {
      initEvents(
        [
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
        ], 
        device, 
        callback
      );
    },
    commands: [ 
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
    ]
  },
};

var tesselModule = module.exports = function (opts) {
  tesselModule.__super__.constructor.apply(this, arguments);
  this.driver = opts.driver
  this.module = modules[this.driver].init(this.connection.port);
  this.setupCommands(modules[this.driver].commands, this.module);
};

Cylon.Utils.subclass(tesselModule, Cylon.Driver);

tesselModule.prototype.start = function(callback) {
  modules[this.driver].start(this, callback);
};

tesselModule.prototype.halt = function(callback) {
  callback();
};
