var Cylon = require('cylon');

Cylon.robot({
  connections: [
    { name: 'tessel', adaptor: 'tessel' },
    { name: 'tessel_A', adaptor: 'tessel', port: 'A' },
  ],
  devices: [
    { name: 'button', driver: 'button', pin: 'config', connection: 'tessel' },
    { name: 'audio', driver: 'audio-vs1053b', connection: 'tessel_A' },
  ],

  work: function(my) {
    var chunks = [];
    var recording = false;

    my.audio.on('error', function (err) {
      console.log(err)
    });

    // When we get data, push it into our array
    my.audio.on('data', function(data) {
      chunks.push(data);
    });

    console.log('Hold the config button to record...');

    my.button.on('push', function() {
      // Tell the audio module to start recording
      if (!recording) {
        my.audio.startRecording('voice', function(err) {
          if (err) {
            console.log("Error while startRecording: ", err);
          }
          console.log('Recording...');
          recording = true;
        });
      }
    });

    // Once the button is released, stop recording
    my.button.on('release', function() {
      // Tell the audio module to stop recording
      console.log('stopping the recording...');
      recording = false;
      my.audio.stopRecording(function(err) {
        if (err) {
          console.log("Error while stopRecording: ", err);
        }
        console.log('Playing it back...');
        // Concat the data and play it
        my.audio.play(Buffer.concat(chunks), function(err) {
          if (err) {
            console.log("Error during playback: ", err);
          }
          // When we're done playing, clear recordings
          chunks = [];
          console.log('Hold the config button to record...');
        });
      });
    });
  }
}).start();
