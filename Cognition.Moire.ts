namespace Cognition {
  export class Moire implements ICognitionEffect {
    private screen: CanvasRenderingContext2D;
    private xPosition: number;
    private yPosition: number;
    private width: number;
    private height: number;

    public initialize(
      displayContext: CanvasRenderingContext2D,
      xPosition: number,
      yPosition: number,
      width: number,
      height: number,
    ) {
      // Bind the "screen" to the canvas context
      this.screen = displayContext;

      this.xPosition = xPosition;
      this.yPosition = yPosition;
      this.width = width;
      this.height = height;
    }

    public draw(t: number) {
      const dest: ImageData = this.screen.getImageData(0, 0, this.width, this.height);
      const time: number = t / 1000;

      const cx1: number = (Math.sin(time / 2) * this.width) / 3 + this.width / 2;
      const cy1: number = (Math.sin(time / 4) * this.height) / 3 + this.height / 2;
      const cx2: number = (Math.cos(time / 3) * this.width) / 3 + this.width / 2;
      const cy2: number = (Math.cos(time) * this.height) / 3 + this.height / 2;

      let destOfs: number = 0;
      for (let y: number = 0; y < this.height; y++) {
        const dy: number = (y - cy1) * (y - cy1);
        const dy2: number = (y - cy2) * (y - cy2);
        for (let x: number = 0; x < this.width; x++) {
          const dx: number = (x - cx1) * (x - cx1);
          const dx2: number = (x - cx2) * (x - cx2);
          const shade: number = (((Math.sqrt(dx + dy) ^ Math.sqrt(dx2 + dy2)) >> 4) & 1) * 255;

          dest.data[destOfs++] = shade; // r
          dest.data[destOfs++] = shade; // g
          dest.data[destOfs++] = shade; // b
          dest.data[destOfs++] = 0xff; // a
        }
      }

      this.screen.putImageData(dest, this.xPosition, this.yPosition);
    }
  }
}
