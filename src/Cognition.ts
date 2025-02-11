export class Cognition {
  private display: HTMLCanvasElement;
  public readonly displayContext: CanvasRenderingContext2D;
  public readonly displayWidth: number;
  public readonly displayHeight: number;

  constructor(canvasElementId: string) {
    this.display = document.getElementById(
      canvasElementId
    ) as HTMLCanvasElement;

    const displayContext: CanvasRenderingContext2D | null =
      this.display.getContext("2d");

    if (!displayContext) {
      throw new Error("Canvas not supported");
    }

    this.displayContext = displayContext;
    this.displayWidth = this.display.width;
    this.displayHeight = this.display.height;
  }

  public setBackgroundColour(colour: string) {
    this.displayContext.fillStyle = colour;
    this.displayContext.fillRect(0, 0, this.displayWidth, this.displayHeight);
  }
}
