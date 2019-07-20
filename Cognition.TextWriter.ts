namespace Cognition {
  export class TextWriter implements ICognitionEffect {
    private screen: CanvasRenderingContext2D;
    private bitmapFont: HTMLImageElement;
    private fontCharacterWidth: number;
    private fontCharacterHeight: number;
    private charactersPerRow: number;

    // Tracks the current character being rendered by the text writer
    private currentCharacter: number = 0;
    // Tracks the delay count between each character being rendered
    private characterPrintDelayCounter: number = 0;

    // Initialises the text writer with a bitmap font to use
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

    public draw(
      textToPrint: string,
      xPosition: number,
      yPosition: number,
      characterPrintDelayInFrames: number
    ) {
      let xPositionOffset: number = 0;

      // Draw all the characters rendered so far from textToPrint up to
      // the currentCharacter
      for (let i = 0; i < this.currentCharacter; i++) {
        this.drawCharacter(
          textToPrint.charAt(i),
          xPosition + xPositionOffset,
          yPosition
        );

        // Increment the xPositionOffset to "move the cursor left"
        // before rendering the next character
        xPositionOffset += this.fontCharacterWidth;
      }

      // Add a delay between each new character render based on the
      // value passed in via the characterPrintDelayInFrames param
      if (this.characterPrintDelayCounter == 0) {
        // If the counter has reached zero, move to the next character
        // and reset the counter
        this.currentCharacter++;
        this.characterPrintDelayCounter = characterPrintDelayInFrames;

        // If we've reach the end of textToPrint, start at the beginning again
        if (this.currentCharacter > textToPrint.length) {
          this.currentCharacter = 0;
        }
      } else {
        // No new character on this frame, just decrement the delay counter
        this.characterPrintDelayCounter--;
      }
    }

    public drawCharacter(
      characterToPrint: string,
      xPosition: number,
      yPosition: number
    ) {
      // Get the index of the character in the bitmap font based on the
      // ASCII character code (minus the first 32 ASCII characters)
      let characterTileIndex: number = characterToPrint.charCodeAt(0) - 32;

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
        xPosition,
        yPosition,
        this.fontCharacterWidth,
        this.fontCharacterHeight
      );
    }
  }
}
