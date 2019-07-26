namespace Cognition.Audio {
  export class ProTrackerSample {
    public Name: string;
    public SizeInBytes: number;
    public FineTune: number;
    public Volume: number;
    public LoopStartOffset: number;
    public LoopLength: number;
    public Data: Uint8Array;
  }
}
