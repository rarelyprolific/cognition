declare const BassoonTracker: any;

class NktxTro0004 {
  private cognition: Cognition.Core = new Cognition.Core("screen");
  private textPrinter: Cognition.ICognitionEffect;
  private module: Cognition.Audio.ProTrackerModule;
  private moduleInfo: number = 0;
  private currentChannel0PatternEntry: Cognition.Audio.ProTrackerPatternEntry;
  private currentChannel1PatternEntry: Cognition.Audio.ProTrackerPatternEntry;
  private currentChannel2PatternEntry: Cognition.Audio.ProTrackerPatternEntry;
  private currentChannel3PatternEntry: Cognition.Audio.ProTrackerPatternEntry;

  public run = () => {
    // Set up the textprinter
    this.textPrinter = new Cognition.TextPrinter();
    this.textPrinter.initialize(this.cognition.displayContext, "font", 16, 16);

    // Set up the modplayer and load the module
    const modplayer = new Protracker();
    const encodedModule = window.atob(PostureSliding);

    // Decode the module back from base64 into a byte array
    const moduleLength = encodedModule.length;
    const moduleBytes = new Uint8Array(new ArrayBuffer(encodedModule.length));
    for (let i = 0; i < moduleLength; i++) {
      moduleBytes[i] = encodedModule.charCodeAt(i);
    }

    // Parse the module
    const moduleParser = new Cognition.Audio.ProTrackerModuleParser();
    this.module = moduleParser.Parse(moduleBytes);

    // Set up the web audio API context
    // const audioContext = new AudioContext();
    // const moduleReplayerAudioNode = audioContext.createScriptProcessor(4096, 1, 2);

    // moduleReplayerAudioNode.onaudioprocess = (ev: AudioProcessingEvent) => {
    //   //   // The output buffer holds the sample data we want to play
    //   //   var output = ev.outputBuffer.getChannelData(0);
    //   //   // Generate some random sample data to simulate white noise
    //   //   for (var i = 0; i < output.length; i++) {
    //   //     output[i] = Math.random();
    //   //   }
    //   this.moduleInfo++;
    //   this.currentChannel0PatternEntry = this.module.Patterns[0].Channels[0].PatternEntries[3];
    //   this.currentChannel1PatternEntry = this.module.Patterns[0].Channels[1].PatternEntries[3];
    //   this.currentChannel2PatternEntry = this.module.Patterns[0].Channels[2].PatternEntries[3];
    //   this.currentChannel3PatternEntry = this.module.Patterns[0].Channels[3].PatternEntries[3];
    // };

    // moduleReplayerAudioNode.connect(audioContext.destination);

    // TODO: I need to figure out the period table logic and how to convert
    // period values to their equivalent "notes".
    console.log(this.module);

    BassoonTracker.init(true);
    BassoonTracker.load("../assets/Monday.mod", true);

    this.loop();
  };

  public loop = () => {
    // Main intro loop (assume 60fps or test for it!)
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };

  private renderFrame = () => {
    // Set the background colour
    this.cognition.setBackgroundColour("#0A4D04");

    this.textPrinter.draw("MODULENAME: " + this.module.SongName.toUpperCase(), 16, 16);

    if (this.currentChannel0PatternEntry !== undefined) {
      this.textPrinter.draw("CH0: " + this.currentChannel0PatternEntry.Note, 16, 80);
    }

    if (this.currentChannel1PatternEntry !== undefined) {
      this.textPrinter.draw("CH1: " + this.currentChannel1PatternEntry.Note, 200, 80);
    }

    if (this.currentChannel2PatternEntry !== undefined) {
      this.textPrinter.draw("CH2: " + this.currentChannel2PatternEntry.Note, 400, 80);
    }

    if (this.currentChannel3PatternEntry !== undefined) {
      this.textPrinter.draw("CH3: " + this.currentChannel3PatternEntry.Note, 600, 80);
    }

    this.textPrinter.draw("MUSICPLAYING: " + (BassoonTracker.isPlaying() ? "YES" : "NO"), 100, 100);

    if (BassoonTracker.isPlaying()) {
      const song = BassoonTracker.getSong();
      this.textPrinter.draw("MODULETITLE: " + song.title.toUpperCase(), 150, 150);
      this.textPrinter.draw(
        "TIME: " + Math.round(BassoonTracker.audio.context.currentTime * 100) / 100,
        16,
        48
      );
    }

    // Run the text printer
    this.textPrinter.draw("NEOKORTEX", 642, 550);
    this.textPrinter.draw("COGNITION", 642, 570);
  };
}
