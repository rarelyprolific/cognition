class NktxTro0002 {
  private cognition: Cognition.Core = new Cognition.Core("screen");
  private starfield: Cognition.ICognitionEffect;
  private font: HTMLImageElement;

  // **** PROOF OF CONCEPT INLINED TEXT WRITER - REFACTOR LATER! ****
  private theMessage: string = "JUST DOING STUFF HERE!";
  private currentCharacter: number = 0;
  private currentXPosition: number = 300;
  private textPrintDelay: number = 4;
  // **** PROOF OF CONCEPT INLINED TEXT WRITER - REFACTOR LATER! ****

  public run = () => {
    // Perform initialisation
    this.starfield = new Cognition.Starfield(
      this.cognition.displayWidth,
      this.cognition.displayHeight
    );
    this.starfield.initialize(100, 4);

    // Load font for textwriter
    this.font = <HTMLImageElement>document.getElementById("font");

    this.loop();
  };

  private renderFrame() {
    this.cognition.setBackgroundColour("#202A25");
    this.starfield.draw(this.cognition.displayContext, 1);

    // Show the entire font
    this.cognition.displayContext.drawImage(this.font, 10, 10);
    this.drawString("HELLO WORLD!");

    // **** PROOF OF CONCEPT INLINED TEXT WRITER - REFACTOR LATER! ****
    this.drawTextWriter();
    // **** PROOF OF CONCEPT INLINED TEXT WRITER - REFACTOR LATER! ****
  }

  // **** PROOF OF CONCEPT INLINED TEXT WRITER - REFACTOR LATER! ****
  private drawTextWriter() {
    // Draw all the characters rendered so far in theMessage
    for (let i = 0; i < this.currentCharacter; i++) {
      this.drawCharacter(this.theMessage.charCodeAt(i), this.currentXPosition);
      this.currentXPosition += 16;
    }

    // Reset the currentXPosition for the next frame
    this.currentXPosition = 300;

    // Add a delay between each new character render
    if (this.textPrintDelay == 0) {
      // If we've reached the end of theMessage, start at the beginning again
      if (this.currentCharacter > this.theMessage.length) {
        this.currentCharacter = 0;
      } else {
        this.currentCharacter++;
      }

      // The delay counter reached zero so reset it for the next iteration
      this.textPrintDelay = 4;
    } else {
      // No new character on this frame, just decrement the delay counter
      this.textPrintDelay--;
    }
  }
  // **** PROOF OF CONCEPT INLINED TEXT WRITER - REFACTOR LATER! ****

  private drawString(stringToDraw: string) {
    let xPositionOffset: number = 0;

    for (let i = 0; i < stringToDraw.length; i++) {
      this.drawCharacter(stringToDraw.charCodeAt(i), xPositionOffset);
      xPositionOffset += 16;
    }
  }

  private drawCharacter(asciiCharacterCode: number, xPositionOffset: number) {
    // Get the index of the character in the font image (when tiled) based on the ASCII character code
    let characterTileIndex: number = asciiCharacterCode - 32;

    // Get the number of characters in each row of the font image
    let charactersPerRow: number = this.font.width / 16;

    // Calculate which row of the font image this character is on
    let characterOnRow: number = Math.floor(
      characterTileIndex / charactersPerRow
    );

    // Calculate the x position of this letter in the font image
    let xPositionOfLetterInFontImage: number =
      characterTileIndex * 16 - charactersPerRow * 16 * characterOnRow;

    // Calculate the y position of this letter in the font image
    let yPositionOfLetterInFontImage: number = characterOnRow * 16;

    // Draw a letter from the font
    this.cognition.displayContext.drawImage(
      this.font,
      xPositionOfLetterInFontImage, // the x offset in the font image
      yPositionOfLetterInFontImage, // the y offset in the font image
      16, // the width to scale to
      16, // the height to scale to
      100 + xPositionOffset, // the x position to place the letter at
      100, // the y position to place the letter at
      16, // the width of the letter
      16 // the height of the letter
    );
  }

  public loop = () => {
    // Main intro loop (assume 60fps or test for it!)
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };
}
