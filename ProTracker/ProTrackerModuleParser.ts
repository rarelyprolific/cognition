namespace Cognition.Audio {
  export class ProTrackerModuleParser {
    private RawModuleBytes: Uint8Array;
    private Module: ProTrackerModule;

    public Parse(rawModuleBytes: Uint8Array): ProTrackerModule {
      this.RawModuleBytes = rawModuleBytes;
      this.Module = new ProTrackerModule();

      // Get the type of the module
      this.Module.ModuleType = this.ParseString(1080, 4);

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
      this.Module.SongName = this.ParseString(0, 20);
      this.Module.SongLength = this.ParseIntegerFromByte(950);
      this.Module.SongPositions = this.GetSongPositionsAndCalculateNumberOfPatterns();
      this.Module.Samples = this.GetSamples();

      // TODO: We need to test if byte offset 951 is 127 and handle
      // [Well... this little byte here is set to 127, so that old
      // trackers will search through all patterns when loading.
      // Noisetracker uses this byte for restart, but we don't.]

      // TODO: We still need to get the pattern information!

      return this.Module;
    }

    private GetSamples(): Array<ProTrackerSample> {
      // We always have 31 samples (verify if this is always the case)
      let samples = new Array<ProTrackerSample>(31);

      // Holds the offset for the next sample info to read
      let infoOffset = 0;

      // Holds the offset for the next sample data to read
      // (The start of the sample data is after the pattern data)
      let dataOffset = 1084 + this.Module.NumberOfPatterns * 1024;

      // Build the sample collection from the raw sample data
      for (let i = 0; i < samples.length; i++) {
        // Create and populate a new sample
        let sample = new ProTrackerSample();

        // TODO: I need to get a module which uses sample finetuning to
        // determine if I'm parsing sample.FineTune correctly. Just doing
        // the most simple thing for now but I need to check it later!
        sample.Name = this.ParseString(20 + infoOffset, 22);
        sample.SizeInBytes = this.ParseIntegerFromWord(42 + infoOffset);
        sample.FineTune = this.ParseIntegerFromByte(44 + infoOffset);
        sample.Volume = this.ParseIntegerFromByte(45 + infoOffset);
        sample.LoopStartOffset = this.ParseIntegerFromWord(46 + infoOffset);
        sample.LoopLength = this.ParseIntegerFromWord(48 + infoOffset);

        // Get the sample data
        sample.Data = this.RawModuleBytes.slice(
          dataOffset,
          dataOffset + sample.SizeInBytes
        );

        // Assign this sample to the collection and move to the next sample
        samples[i] = sample;

        infoOffset += 30;
        dataOffset += sample.SizeInBytes;
      }

      return samples;
    }

    private GetSongPositionsAndCalculateNumberOfPatterns(): Array<number> {
      // We always have 128 song positions
      let songPositions = new Array<number>(128);

      // Initialise the number of patterns to zero
      this.Module.NumberOfPatterns = 0;

      // Build the song positions collection from the raw data
      for (let i = 0; i < songPositions.length; i++) {
        var pattern = this.ParseIntegerFromByte(952 + i);

        songPositions[i] = pattern;

        // We calculate the number of patterns in the module by finding
        // the highest pattern number in the song positions table
        if (pattern > this.Module.NumberOfPatterns) {
          this.Module.NumberOfPatterns = pattern;
        }
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
    private ParseString(offset: number, length: number): string {
      let stringBytes = this.RawModuleBytes.slice(offset, offset + length);
      return String.fromCharCode.apply(null, stringBytes);
    }

    // Gets a byte-sized integer value embedded at an offset in the raw module bytes
    private ParseIntegerFromByte(offset: number): number {
      return this.RawModuleBytes.slice(offset, offset + 1)[0];
    }

    // Gets a word-sized (i.e. 2 byte/16-bit) integer value embedded at an offset
    // in the raw module bytes
    private ParseIntegerFromWord(offset: number): number {
      let bytes = this.RawModuleBytes.slice(offset, offset + 2);
      return (bytes[0] * 256 + bytes[1]) * 2;
    }
  }
}
