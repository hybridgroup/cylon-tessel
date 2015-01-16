"use strict";

module.exports = {
  events: [
    // Master Events
    "error",
    "scanStart",
    "scanStop",
    "discover",
    "connect",
    "disconnect",
    "servicesDiscover",
    "characteristicsDiscover",
    "descriptorsDiscover",
    "characteristicRead",
    "characteristicWrite",
    "descriptorRead",
    "descriptorWrite",
    "notification",
    "indication",
    "rssiUpdate",

    // Slave Events
    "startAdvertising",
    "stopAdvertising",
    "connect",
    "disconnect",
    "remoteWrite",
    "remoteReadRequest",
    "remoteNotification",
    "remoteIndication",
    "remoteUpdateStop",
    "indicated"
  ],

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
};
