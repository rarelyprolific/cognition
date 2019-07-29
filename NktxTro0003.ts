declare var Protracker: any;
declare var Lite13Module: any;
declare var PostureSliding: any;

class NktxTro0003 {
  private cognition: Cognition.Core = new Cognition.Core("screen");
  private textPrinter: Cognition.ICognitionEffect;
  private module: Cognition.Audio.ProTrackerModule;

  public run = () => {
    // Set up the textprinter
    this.textPrinter = new Cognition.TextPrinter();
    this.textPrinter.initialize(this.cognition.displayContext, "font", 16, 16);

    // Set up the modplayer
    var modplayer = new Protracker();

    // Load the module
    var encodedModule = window.atob(Lite13Module);

    // Decode the module back from base64 into a byte array
    var moduleLength = encodedModule.length;
    var moduleBytes = new Uint8Array(new ArrayBuffer(encodedModule.length));

    for (let i = 0; i < moduleLength; i++) {
      moduleBytes[i] = encodedModule.charCodeAt(i);
    }

    let moduleParser = new Cognition.Audio.ProTrackerModuleParser();
    this.module = moduleParser.Parse(moduleBytes);
    console.log("SongLength: " + this.module.SongLength);
    console.log("NumberOfPatterns: " + this.module.NumberOfPatterns);
    console.log("ChannelCount: " + this.module.Channels);
    console.log("Position[3]: " + this.module.SongPositions[3]);
    console.log("Position[4]: " + this.module.SongPositions[4]);
    console.log("Position[5]: " + this.module.SongPositions[5]);
    console.log(
      this.module.Samples[0].Name +
        " - " +
        this.module.Samples[0].FineTune +
        " - " +
        this.module.Samples[0].Volume +
        " - " +
        this.module.Samples[0].LoopStartOffset +
        " - " +
        this.module.Samples[0].LoopLength
    );
    console.log(
      this.module.Samples[1].Name +
        " - " +
        this.module.Samples[1].FineTune +
        " - " +
        this.module.Samples[1].Volume +
        " - " +
        this.module.Samples[1].LoopStartOffset +
        " - " +
        this.module.Samples[1].LoopLength
    );
    console.log(
      this.module.Samples[30].Name +
        " - " +
        this.module.Samples[30].FineTune +
        " - " +
        this.module.Samples[30].Volume +
        " - " +
        this.module.Samples[30].LoopStartOffset +
        " - " +
        this.module.Samples[30].LoopLength
    );

    // TODO: moduleBytes contains the Lite13 ProTracker module but we can't use it yet.
    // First, we need to implement the code to parse the pattern and sample data from the module.
    // Then we need to create a "mixer" web audio processing node with an "onaudioprocess" event
    // which will be called by the web audio API when it needs more sample data.
    // The "onaudioprocess" event handler for the "mixer" node will then need to figure out:
    //  1. Which samples should be playing across all the channels of the module right now.
    //  2. Apply/emulate any module effect.
    //  3. Mix the samples into one (mono) or two (stereo) channels.

    // Create a web audio context
    let audioContext = new AudioContext();

    // Create a white noise generator audio processing node with a 4096 sample
    // buffer size, one input channel and two output channels (stereo)
    let whiteNoiseGeneratorAudioNode = audioContext.createScriptProcessor(
      4096,
      1,
      2
    );

    // The "onaudioprocess" event is called by the web audio API
    whiteNoiseGeneratorAudioNode.onaudioprocess = function(
      ev: AudioProcessingEvent
    ) {
      // The output buffer holds the sample data we want to play
      var output = ev.outputBuffer.getChannelData(0);

      // Generate some random sample data to simulate white noise
      for (var i = 0; i < output.length; i++) {
        output[i] = Math.random();
      }
    };

    // Wire up the white noise generator to the audio context destination (i.e. the speakers)
    //whiteNoiseGeneratorAudioNode.connect(audioContext.destination);

    this.loop();
  };

  private renderFrame() {
    // Set the background colour
    this.cognition.setBackgroundColour("#2A57A1");

    // Run the text printer
    this.textPrinter.draw(
      "PROTRACKER MODULE REPLAYER - WORK IN PROGRESS",
      20,
      6
    );

    this.textPrinter.draw(
      "(WELL, IT'S A WHITE NOISE GENERATOR SO FAR!)",
      40,
      25
    );

    this.textPrinter.draw(
      "MODULENAME: " + this.module.SongName.toUpperCase(),
      20,
      55
    );

    for (let i = 0; i < 31; i++) {
      let padZero = "";

      if (i < 10) {
        padZero = "0";
      }

      this.textPrinter.draw(
        padZero +
          i.toString() +
          " " +
          this.module.Samples[i].Name.toUpperCase() +
          " " +
          this.module.Samples[i].SizeInBytes,
        16,
        85 + i * 16
      );
    }

    this.textPrinter.draw("NEOKORTEX", 642, 550);
    this.textPrinter.draw("COGNITION", 642, 570);
  }

  public loop = () => {
    // Main intro loop (assume 60fps or test for it!)
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };
}
