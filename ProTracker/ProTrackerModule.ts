namespace Cognition.Audio {
  export class ProTrackerModule {
    public ModuleType: string;
    public SongName: string;
    public SongLength: number;
    public Channels: Array<ProTrackerChannel>;
    public Samples: Array<ProTrackerSample>;
    public SongPositions: Array<number>;
    public NumberOfPatterns: number;
  }
}
