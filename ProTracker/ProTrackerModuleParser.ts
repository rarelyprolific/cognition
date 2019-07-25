namespace Cognition.Audio {
  export class ProTrackerModuleParser {
    private readonly SongNameOffset: number = 0;
    private readonly SongNameLength: number = 20;

    private readonly ModuleTypeOffset: number = 1080;
    private readonly ModuleTypeLength: number = 4;

    public Parse(rawModuleDataToParse: Uint8Array): ProTrackerModule {
      let module = new ProTrackerModule();

      // Parse the song name of the module
      let songNameBytes = rawModuleDataToParse.slice(
        this.SongNameOffset,
        this.SongNameOffset + this.SongNameLength
      );
      module.SongName = String.fromCharCode.apply(null, songNameBytes);

      // Parse the type of the module
      // (There can be a few quirks here and there is some useful info
      // here: http://coppershade.org/articles/More!/Topics/Protracker_File_Format/
      // Depending how "complex" this is we may need different parsers for different
      // types of module.)
      let moduleTypeBytes = rawModuleDataToParse.slice(
        this.ModuleTypeOffset,
        this.ModuleTypeOffset + this.ModuleTypeLength
      );
      module.ModuleType = String.fromCharCode.apply(null, moduleTypeBytes);

      return module;
    }
  }
}
