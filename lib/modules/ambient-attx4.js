"use strict";

module.exports = {
  events: [
    "ready",
    "error",
    "light",
    "light-trigger",
    "sound",
    "sound-trigger"
  ],

  commands: [
    "clearLightTrigger",
    "clearSoundTrigger",
    "getLightBuffer",
    "getLightLevel",
    "getSoundBuffer",
    "getSoundLevel",
    "setLightTrigger",
    "setSoundTrigger"
  ]
};
