namespace Cognition {
  export class Scroller implements ICognitionEffect {
    private screen: CanvasRenderingContext2D;
    private bitmapFont: HTMLImageElement;
    private fontCharacterWidth: number;
    private fontCharacterHeight: number;
    private charactersPerRow: number;

    private configuredScrollFromRightXPosition: number;
    private configuredScrollToLeftXPosition: number;
    private currentXPosition: number;

    public initialize(
      displayContext: CanvasRenderingContext2D,
      bitmapFontImageHtmlElementId: string,
      fontCharacterWidth: number,
      fontCharacterHeight: number,
      scrollFromRightXPosition: number,
      scrollToLeftXPosition: number
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

      // Setup the initial position of the scrolltext
      this.configuredScrollFromRightXPosition = scrollFromRightXPosition;
      this.configuredScrollToLeftXPosition = scrollToLeftXPosition;
      this.currentXPosition = this.configuredScrollFromRightXPosition;
    }

    public draw(textToPrint: string, yPosition: number) {
      let xPositionOffset = 0;

      for (let i = 0; i < textToPrint.length; i++) {
        this.drawCharacter(
          textToPrint.charAt(i),
          this.currentXPosition + xPositionOffset,
          yPosition
        );

        xPositionOffset += this.fontCharacterWidth;
      }

      // TODO: Very quick scroll code. I need to extend this so we ONLY read
      // each character which should be visible on-screen and remove each
      // character which disappears off-screen. We also need to wrap around.
      // To do this efficiently, I will need to calculate the width of the
      // scroller, how many character will fit on it and only read that far
      // into the textToPrint string
      this.currentXPosition -= 3;

      if (this.currentXPosition < this.configuredScrollToLeftXPosition) {
        this.currentXPosition = this.configuredScrollFromRightXPosition;
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
