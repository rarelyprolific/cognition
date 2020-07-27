namespace Cognition {
  export class Fire implements ICognitionEffect {
    private screen: CanvasRenderingContext2D;

    private flames: Array<number> = new Array<number>(80 * 63).fill(0);

    public initialize(displayContext: CanvasRenderingContext2D) {
      // Bind the "screen" to the canvas context
      this.screen = displayContext;
    }

    public draw() {
      const width: number = 80;
      const height: number = 63;

      for (let i = 0; i < width; i++) {
        this.flames[i + width] = Math.random() * 255;
      }

      // every row
      for (let y = height; y > 1; y--)
        // every column
        for (let x = 0; x < width; x++) {
          let i = y * width + x; // convert the x and y coordinates to the array index
          this.flames[i] = Math.floor(
            // add the cell values:
            (this.flames[(y - 1) * width + ((x - 1 + width) % width)] + // below, left
            this.flames[(y - 1) * width + ((x + width) % width)] + // immediately below
            this.flames[(y - 1) * width + ((x + 1 + width) % width)] + // below, right
              this.flames[(y - 2) * width + ((x + width) % width)]) / // two rows below
              4.1, // division to lower the value as the fire goes up
          );
        }

      for (let i = width * 4; i < width * height; i++) {
        this.screen.fillStyle = `rgb(${this.flames[i]},0,0)`;
        this.screen.fillRect((i % width) * 10, (height - Math.floor(i / width)) * 10, 10, 10);
      }
    }
  }
}
