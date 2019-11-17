class NktxTro0004 {
  private cognition: Cognition.Core = new Cognition.Core("screen");
  private textPrinter: Cognition.ICognitionEffect;
  private module: Cognition.Audio.ProTrackerModule;
  private moduleInfo: number = 0;

  public run = () => {
    // Set up the textprinter
    this.textPrinter = new Cognition.TextPrinter();
    this.textPrinter.initialize(this.cognition.displayContext, "font", 16, 16);

    // Set up the modplayer and load the module
    const modplayer = new Protracker();
    const encodedModule = window.atob(Lite13Module);

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
    const audioContext = new AudioContext();
    const moduleReplayerAudioNode = audioContext.createScriptProcessor(4096, 1, 2);

    moduleReplayerAudioNode.onaudioprocess = (ev: AudioProcessingEvent) => {
      //   // The output buffer holds the sample data we want to play
      //   var output = ev.outputBuffer.getChannelData(0);
      //   // Generate some random sample data to simulate white noise
      //   for (var i = 0; i < output.length; i++) {
      //     output[i] = Math.random();
      //   }
      this.moduleInfo++;
    };

    moduleReplayerAudioNode.connect(audioContext.destination);

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
    this.textPrinter.draw("TIME: " + this.moduleInfo, 16, 48);

    // Run the text printer
    this.textPrinter.draw("NEOKORTEX", 642, 550);
    this.textPrinter.draw("COGNITION", 642, 570);
  };
}
