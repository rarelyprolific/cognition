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

      // We seem to have what looks like a valid ProTracker module so let's
      // go get the rest of the details from it.

      // Get the song name
      this.Module.SongName = this.GetModuleString(0, 20);

      // Get the samples
      this.Module.Samples = this.GetSamples();

      return this.Module;
    }

    // Gets ASCII string information embedded at offsets in the raw module bytes
    private GetModuleString(offset: number, length: number): string {
      let stringBytes = this.RawModuleBytes.slice(offset, offset + length);
      return String.fromCharCode.apply(null, stringBytes);
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

    private GetSamples(): Array<ProTrackerSample> {
      // We always have 31 samples (verify if this is always the case)
      let samples = new Array<ProTrackerSample>(31);

      let sampleOffset = 0;

      for (let i = 0; i < samples.length; i++) {
        let sample = new ProTrackerSample();

        // Get the name of the sample
        sample.Name = this.GetModuleString(20 + sampleOffset, 22);

        // Get the size of the sample. Stored as the number of
        // words so we multiply by two to get the size in bytes.
        let sampleSizeBytes = this.RawModuleBytes.slice(
          42 + sampleOffset,
          42 + sampleOffset + 2
        );
        sample.SizeInBytes =
          (sampleSizeBytes[0] * 256 + sampleSizeBytes[1]) * 2;

        // Assign this sample back to the collection
        samples[i] = sample;

        // Move to the next sample
        sampleOffset += 30;
      }

      return samples;
    }
  }
}
