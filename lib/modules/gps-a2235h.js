"use strict";

module.exports = {
  events: [
    "ready",
    "error",
    "altitude",
    "coordinates",
    "powerOff",
    "powerOn",
    "active-satellites",
    "fix",
    "nav-info",
    "satellite-list-partial",
    "track-info"
  ],

  commands: [
    "powerOff",
    "powerOn",
    "setCoordinateFormat"
  ]
};
