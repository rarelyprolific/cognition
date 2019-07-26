namespace Cognition.Audio {
  export class ProTrackerModuleParser {
    private RawModuleBytes: Uint8Array;
    private Module: ProTrackerModule;

    public Parse(rawModuleBytes: Uint8Array): ProTrackerModule {
      this.RawModuleBytes = rawModuleBytes;
      this.Module = new ProTrackerModule();

      // Get the type of the module
      this.Module.ModuleType = this.GetModuleString(1080, 4);

      // Verify the module type
      if (!this.DetermineModuleTypeAndSetChannels()) {
        console.log(
          "Could not determine type of ProTracker module [" +
            this.Module.ModuleType +
            "]."
        );

        return undefined;
      }

      // We have a ProTracker module so let's get the rest of the data.
      this.Module.SongName = this.GetModuleString(0, 20);
      this.Module.SongLength = this.GetModuleIntegerFromByte(950);
      this.Module.Samples = this.GetSamples();
      this.Module.SongPositions = this.GetSongPositions();

      // TODO: We need to test if byte offset 951 is 127 and handle
      // [Well... this little byte here is set to 127, so that old
      // trackers will search through all patterns when loading.
      // Noisetracker uses this byte for restart, but we don't.]

      return this.Module;
    }

    private GetSamples(): Array<ProTrackerSample> {
      // We always have 31 samples (verify if this is always the case)
      let samples = new Array<ProTrackerSample>(31);

      // Build the sample collection from the raw sample data
      let sampleOffset = 0;
      for (let i = 0; i < samples.length; i++) {
        // Create and populate a new sample
        let sample = new ProTrackerSample();

        // TODO: I need to get a module which uses sample finetuning to
        // determine if I'm parsing sample.FineTune correctly. Just doing
        // the most simple thing for now but I need to check it later!
        sample.Name = this.GetModuleString(20 + sampleOffset, 22);
        sample.SizeInBytes = this.GetModuleIntegerFromWord(42 + sampleOffset);
        sample.FineTune = this.GetModuleIntegerFromByte(44 + sampleOffset);
        sample.Volume = this.GetModuleIntegerFromByte(45 + sampleOffset);
        sample.LoopStartOffset = this.GetModuleIntegerFromWord(
          46 + sampleOffset
        );
        sample.LoopLength = this.GetModuleIntegerFromWord(48 + sampleOffset);

        // Assign this sample to the collection and move to the next sample
        samples[i] = sample;
        sampleOffset += 30;
      }

      return samples;
    }

    private GetSongPositions(): Array<number> {
      // We always have 128 song positions
      let songPositions = new Array<number>(128);

      // Build the song positions collection from the raw data
      for (let i = 0; i < songPositions.length; i++) {
        songPositions[i] = this.GetModuleIntegerFromByte(952 + i);
      }

      return songPositions;
    }

    // Find out which type of ProTracker module we are dealing with
    // (There can be a few quirks here and there is some useful info
    // here: http://coppershade.org/articles/More!/Topics/Protracker_File_Format/
    // Depending how "complex" this is we may need different parsers for different
    // types of module.)
    private DetermineModuleTypeAndSetChannels(): boolean {
      switch (this.Module.ModuleType) {
        // Let's just deal with the "M.K." type at the moment. We WILL need to
        // handle others but let's build this one step at a time.
        case "M.K.":
          this.Module.Channels = new Array<number>(4);
          return true;
        default:
          return false;
      }
    }

    // Gets ASCII string information embedded at an offset in the raw module bytes
    private GetModuleString(offset: number, length: number): string {
      let stringBytes = this.RawModuleBytes.slice(offset, offset + length);
      return String.fromCharCode.apply(null, stringBytes);
    }

    // Gets a byte-sized integer value embedded at an offset in the raw module bytes
    private GetModuleIntegerFromByte(offset: number): number {
      return this.RawModuleBytes.slice(offset, offset + 1)[0];
    }

    // Gets a word-sized (i.e. 2 byte/16-bit) integer value embedded at an offset
    // in the raw module bytes
    private GetModuleIntegerFromWord(offset: number): number {
      let bytes = this.RawModuleBytes.slice(offset, offset + 2);
      return (bytes[0] * 256 + bytes[1]) * 2;
    }
  }
}
