namespace Cognition.Audio {
  export class ProTrackerModuleParser {
    private RawModuleBytes: Uint8Array;

    public Parse(rawModuleBytesToParse: Uint8Array): ProTrackerModule {
      this.RawModuleBytes = rawModuleBytesToParse;

      let module = new ProTrackerModule();

      // Parse the song name of the module
      module.SongName = this.GetStringInformationFromModule(0, 20);

      // Parse the type of the module
      // (There can be a few quirks here and there is some useful info
      // here: http://coppershade.org/articles/More!/Topics/Protracker_File_Format/
      // Depending how "complex" this is we may need different parsers for different
      // types of module.)
      module.ModuleType = this.GetStringInformationFromModule(1080, 4);

      return module;
    }

    // Gets string information embedded at an offset in the raw module bytes
    private GetStringInformationFromModule(
      offset: number,
      length: number
    ): string {
      let stringBytes = this.RawModuleBytes.slice(offset, offset + length);
      return String.fromCharCode.apply(null, stringBytes);
    }
  }
}
