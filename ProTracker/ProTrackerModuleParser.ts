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
      this.Module.Patterns = this.GetPatterns();

      // TODO: We need to test if byte offset 951 is 127 and handle
      // [Well... this little byte here is set to 127, so that old
      // trackers will search through all patterns when loading.
      // Noisetracker uses this byte for restart, but we don't.]

      return this.Module;
    }

    // There are 256 pattern entries in a pattern (64 positions across 4 channels)
    // The information in each pattern entry in stored across 4 bytes, so each
    //     pattern is 1024 bytes in length.
    // Each pattern entry has five distinct values (as above) we need to parse
    //     out. So our unpacked array will be 1280 bytes (64 pos*4 channels*5 values)
    private GetPatterns(): Array<ProTrackerPattern> {
      // The pattern information starts at offset 1084.
      let patternOffset = 1084;

      // We have already calculated the number of patterns when getting song positions
      let patterns = new Array<ProTrackerPattern>(this.Module.NumberOfPatterns);

      for (let p = 0; p < patterns.length; p++) {
        let pattern = new ProTrackerPattern();
        pattern.Channels = new Array<ProTrackerChannel>();

        // Builds the channels with pattern entries
        for (let c = 0; c < this.Module.Channels; c++) {
          pattern.Channels[c] = new ProTrackerChannel();
          pattern.Channels[c].PatternEntries = new Array<
            ProTrackerPatternEntry
          >();
        }

        // Populate the pattern
        for (let pe = 0; pe < 64; pe++) {
          for (let c = 0; c < this.Module.Channels; c++) {
            let patternEntry = new ProTrackerPatternEntry();

            // Get values
            patternEntry.Note = this.ParseNoteFromPatternData(patternOffset);
            patternEntry.SampleNumber = this.ParseSampleNumberFromPatternData(
              patternOffset
            );
            patternEntry.Volume = this.ParseVolumeFromPatternData(
              patternOffset
            );
            patternEntry.CommandCode = this.ParseCommandCodeFromPatternData(
              patternOffset
            );
            patternEntry.Data = this.ParseDataFromPatternData(patternOffset);

            pattern.Channels[c].PatternEntries[pe] = patternEntry;
            patternOffset += 4;
          }
        }

        // Add this pattern to the collection
        patterns[p] = pattern;
      }
      console.log(patterns);

      let patternEntries = this.RawModuleBytes.slice(1084, 1084 + 17);
      console.log("Pattern entries: " + patternEntries);

      // Each pattern entry has five values:
      // 1. Note (254=noteoff, 255=no note)
      // 2. Sample (0=no instrument, 1..255=sample number)
      // 3. Volume (255=no volume set, 0..64=set volume)
      // 4. Command (0x2e=no command, 0..0x24=effect command)
      // 5. Data (0..255)

      // The first packed values are:
      // 1,    29, 191,  5
      // 0,     0,   0,  0
      // 143, 162,  15,  1
      // 125,  90,   7,  0

      // The unpacked values from the first four pattern entries in the first
      // four channels of Lite13 should be:
      //  55, 11, 255, 15,  5
      // 255,  0, 255,  0,  0
      //  71, 10, 255,  2, 15
      //  50,  5, 255, 10,  7

      // Get first pattern entry values
      let firstNote = ((patternEntries[0] & 0x0f) << 8) | patternEntries[1];
      firstNote = ProTrackerPeriodTable.indexOf(firstNote);
      firstNote = firstNote % 12 | ((Math.floor(firstNote / 12) + 2) << 4);
      console.log(
        "First note value should be 55: " +
          firstNote +
          " -> " +
          patterns[0].Channels[0].PatternEntries[0].Note
      );

      let firstSampleNumber =
        (patternEntries[0] & 0xf0) | (patternEntries[2] >> 4);
      console.log(
        "First sample number should be 11: " +
          firstSampleNumber +
          " -> " +
          patterns[0].Channels[0].PatternEntries[0].SampleNumber
      );
      let firstCommandValue = patternEntries[2] & 0x0f;
      console.log(
        "First command value should be 15: " +
          firstCommandValue +
          " -> " +
          patterns[0].Channels[0].PatternEntries[0].CommandCode
      );
      console.log(
        "First data value should be 5: " +
          patternEntries[3] +
          " -> " +
          patterns[0].Channels[0].PatternEntries[0].Data
      );

      // Get second note values
      console.log(
        "Second note value should be 255: " +
          patterns[0].Channels[0].PatternEntries[1].Note
      );
      console.log(
        "Second sample number should be 0: " +
          patterns[0].Channels[0].PatternEntries[1].SampleNumber
      );
      console.log(
        "Second command value should be 0: " +
          patterns[0].Channels[0].PatternEntries[1].CommandCode
      );
      console.log(
        "Second data value should be 0: " +
          patterns[0].Channels[0].PatternEntries[1].Data
      );

      // Get third pattern entry values
      let thirdNote = ((patternEntries[8] & 0x0f) << 8) | patternEntries[9];
      thirdNote = ProTrackerPeriodTable.indexOf(thirdNote);
      thirdNote = thirdNote % 12 | ((Math.floor(thirdNote / 12) + 2) << 4);
      console.log(
        "Third note value should be 71: " +
          thirdNote +
          " -> " +
          patterns[0].Channels[2].PatternEntries[0].Note
      );

      let thirdSampleNumber =
        (patternEntries[8] & 0xf0) | (patternEntries[10] >> 4);
      console.log(
        "Third sample number should be 10: " +
          thirdSampleNumber +
          " -> " +
          patterns[0].Channels[2].PatternEntries[0].SampleNumber
      );
      let thirdCommandValue = patternEntries[10] & 0x0f;
      console.log(
        "Third command value should be 2: " +
          thirdCommandValue +
          " -> " +
          patterns[0].Channels[2].PatternEntries[0].CommandCode
      );
      console.log(
        "Third data value should be 15: " +
          patternEntries[11] +
          " -> " +
          patterns[0].Channels[2].PatternEntries[0].Data
      );

      // Get fourth pattern entry values
      let fourthNote = ((patternEntries[12] & 0x0f) << 8) | patternEntries[13];
      fourthNote = ProTrackerPeriodTable.indexOf(fourthNote);
      fourthNote = fourthNote % 12 | ((Math.floor(fourthNote / 12) + 2) << 4);
      console.log(
        "Fourth note value should be 50: " +
          fourthNote +
          " -> " +
          patterns[0].Channels[3].PatternEntries[0].Note
      );

      let fourthSampleNumber =
        (patternEntries[12] & 0xf0) | (patternEntries[14] >> 4);
      console.log(
        "Fourth sample number should be 5: " +
          fourthSampleNumber +
          " -> " +
          patterns[0].Channels[3].PatternEntries[0].SampleNumber
      );
      let fourthCommandValue = patternEntries[14] & 0x0f;
      console.log(
        "Fourth command value should be 10: " +
          fourthCommandValue +
          " -> " +
          patterns[0].Channels[3].PatternEntries[0].CommandCode
      );
      console.log(
        "Fourth data value should be 7: " +
          patternEntries[15] +
          " -> " +
          patterns[0].Channels[3].PatternEntries[0].Data
      );

      return patterns;
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
          this.Module.Channels = 4;
          return true;
        default:
          return false;
      }
    }

    // Gets ASCII string information embedded at an offset in the raw module bytes
    // TODO: Tidy this up later.. We don't need to use slice here anymore!
    private ParseString(offset: number, length: number): string {
      let stringBytes = this.RawModuleBytes.slice(offset, offset + length);
      return String.fromCharCode.apply(null, stringBytes);
    }

    // Gets a byte-sized integer value embedded at an offset in the raw module bytes
    // TODO: Tidy this up later.. We don't need to use slice here anymore!
    private ParseIntegerFromByte(offset: number): number {
      return this.RawModuleBytes.slice(offset, offset + 1)[0];
    }

    // Gets a word-sized (i.e. 2 byte/16-bit) integer value embedded at an offset
    // in the raw module bytes
    // TODO: Tidy this up later.. We don't need to use slice here anymore!
    private ParseIntegerFromWord(offset: number): number {
      let bytes = this.RawModuleBytes.slice(offset, offset + 2);
      return (bytes[0] * 256 + bytes[1]) * 2;
    }

    // TODO: Explain what this is doing to get the note
    private ParseNoteFromPatternData(offset: number): number {
      let noteValue =
        ((this.RawModuleBytes[offset] & 0x0f) << 8) |
        this.RawModuleBytes[offset + 1];
      let periodKey = ProTrackerPeriodTable.indexOf(noteValue);

      let note = periodKey % 12 | ((Math.floor(periodKey / 12) + 2) << 4);
      return note > 0 ? note : 255;
    }

    // TODO: Explain what this is doing to get the sample number
    private ParseSampleNumberFromPatternData(offset: number): number {
      return (
        (this.RawModuleBytes[offset] & 0xf0) |
        (this.RawModuleBytes[offset + 2] >> 4)
      );
    }

    // TODO: Explain what this is doing to get the volume
    private ParseVolumeFromPatternData(offset: number): number {
      // At the moment I think we just always use 255. Check this!
      return 255;
    }

    // TODO: Explain what this is doing to get the command code
    private ParseCommandCodeFromPatternData(offset: number): number {
      return this.RawModuleBytes[offset + 2] & 0x0f;
    }

    // TODO: Explain what this is doing to get the data
    private ParseDataFromPatternData(offset: number): number {
      return this.RawModuleBytes[offset + 3];
    }
  }
}
