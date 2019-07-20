namespace Cognition {
  export class TextPrinter implements ICognitionEffect {
    private screen: CanvasRenderingContext2D;
    private bitmapFont: HTMLImageElement;
    private fontCharacterWidth: number;
    private fontCharacterHeight: number;
    private charactersPerRow: number;

    // Initialises the text printer with a bitmap font to use
    public initialize(
      displayContext: CanvasRenderingContext2D,
      bitmapFontImageHtmlElementId: string,
      fontCharacterWidth: number,
      fontCharacterHeight: number
    ) {
      // Bind the "screen" to the canvas context
      this.screen = displayContext;

      // Load the bitmap font from a HTML IMG element in the DOM
      this.bitmapFont = <HTMLImageElement>(
        document.getElementById(bitmapFontImageHtmlElementId)
      );

      // Specify the dimensions of characters in the bitmap font
      this.fontCharacterWidth = fontCharacterWidth;
      this.fontCharacterHeight = fontCharacterHeight;

      // Calculate how many characters on a single row of the bitmap font
      this.charactersPerRow = this.bitmapFont.width / fontCharacterWidth;
    }

    // Prints the text, using the bitmap font, at the co-ordinates specified
    public draw(textToPrint: string, xPosition: number, yPosition: number) {
      let xPositionOffset = 0;

      // Render each character of the textToPrint to the screen
      for (let i = 0; i < textToPrint.length; i++) {
        // Get the index of the character in the bitmap font based on the
        // ASCII character code (minus the first 32 ASCII characters)
        let characterTileIndex: number = textToPrint.charCodeAt(i) - 32;

        // Calculate which row of the bitmap font this character is on
        let characterOnRow: number = Math.floor(
          characterTileIndex / this.charactersPerRow
        );

        // Calculate the xPosition of this character in the bitmap font
        let xPositionOfCharacterInBitmapFont: number =
          characterTileIndex * this.fontCharacterWidth -
          this.charactersPerRow * this.fontCharacterWidth * characterOnRow;

        // Calculate the yPosition of this character in the bitmap font
        let yPositionOfCharacterInBitmapFont: number =
          characterOnRow * this.fontCharacterHeight;

        // Render this character to the screen
        this.screen.drawImage(
          this.bitmapFont,
          xPositionOfCharacterInBitmapFont,
          yPositionOfCharacterInBitmapFont,
          this.fontCharacterWidth,
          this.fontCharacterHeight,
          xPosition + xPositionOffset,
          yPosition,
          this.fontCharacterWidth,
          this.fontCharacterHeight
        );

        // Increment the xPositionOffset to "move the cursor left"
        // before rendering the next character
        xPositionOffset += this.fontCharacterWidth;
      }
    }
  }
}
