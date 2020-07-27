namespace Cognition {
  class Block {
    constructor(public x: number, public y: number) {}
  }

  export class BlockWiper implements ICognitionEffect {
    private screen: CanvasRenderingContext2D;

    private blockWidth: number;
    private blockHeight: number;

    private blocks: Array<Block> = new Array<Block>();

    public initialize(displayContext: CanvasRenderingContext2D, blockWidth: number = 16, blockHeight: number = 16) {
      this.blockWidth = blockWidth;
      this.blockHeight = blockHeight;

      // Bind the "screen" to the canvas context
      this.screen = displayContext;

      let blockXpos = 0;
      for (let i = 0; i < 20; i++) {
        this.blocks.push(new Block(blockXpos, 5));
        blockXpos += this.blockWidth;
      }
    }

    public draw() {
      this.blocks.forEach((block) => {
        if (block.y >= 500) {
          block.y = 500;
        } else {
          block.y += 1;
        }
      });

      this.blocks.forEach((block) => {
        this.screen.fillStyle = "#a9bab9";
        this.screen.fillRect(block.x, block.y, this.blockWidth, this.blockHeight);
      });
    }
  }
}
