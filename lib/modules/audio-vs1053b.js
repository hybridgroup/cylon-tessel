"use strict";

module.exports = {
  events: [
    "ready",
    "error",
    "volume",
    "input",
    "output",
    "startRecording",
    "data",
    "stopRecording",
    "play",
    "pause",
    "stop",
    "end"
  ],

  commands: [
    "setVolume",
    "setInput",
    "setOutput",
    "startRecording",
    "stopRecording",
    "play",
    "pause",
    "stop",
    "createPlayStream",
    "createRecordStream",
    "availableRecordingProfiles"
  ]
};
