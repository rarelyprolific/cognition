class NktxTro0005 {
  private cognition: Cognition.Core = new Cognition.Core("screen");
  private textPrinter: Cognition.ICognitionEffect;
  private textWriter: Cognition.ICognitionEffect;
  private textWriterPages: string[] = new Array();
  private scroller: Cognition.ICognitionEffect;
  private moire: Cognition.ICognitionEffect;

  private moireValue: number = 0;
  private moireColour: number = 0;
  private moireColourChangeDirection: number = 1;

  public run = () => {
    // Set up the textprinter
    this.textPrinter = new Cognition.TextPrinter();
    this.textPrinter.initialize(this.cognition.displayContext, "font", 16, 16);

    // Set up the scroller
    this.scroller = new Cognition.Scroller();
    this.scroller.initialize(this.cognition.displayContext, "font", 16, 16, this.cognition.displayWidth, 0);

    // Set up the textwriter
    this.textWriterPages.push("NEOKORTEX PRESENTS\n\n   A SHORT INTRO");
    this.textWriterPages.push("THIS IS THE SECOND PAGE\n\nI NEED SOMETHING\nINTERESTING TO WRITE");
    this.textWriterPages.push("BUT I'M ON THE THIRD PAGE\nNOW AND HAVE NO INSPIRATION");
    this.textWriterPages.push("OH WELL!\n\nLET'S CALL IT THE END THEN!\n\n\n    WRAP!");

    this.textWriter = new Cognition.TextWriter();
    this.textWriter.initialize(this.cognition.displayContext, "font", 16, 16, 30);

    // Set up moire
    this.moire = new Cognition.Moire();
    this.moire.initialize(this.cognition.displayContext, 10, 30, 780, 560);

    // Play music
    BassoonTracker.init(true);
    BassoonTracker.load("../assets/blastyourbrain.mod", true);

    this.loop();
  };

  public loop = () => {
    // Main intro loop (assume 60fps or test for it!)
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };

  private renderFrame = () => {
    // Set the background colour
    this.cognition.setBackgroundColour("#000000");

    // Run the scroller
    this.scroller.draw(
      "HEY THERE! THIS IS JUST SOME PROTOTYPE BITS SLUNG TOGETHER.. THERE ISN'T EVEN A TURD HERE READY " +
        "TO POLISH YET!     NEOKORTEX MEMBERS LIST : FUZION (ASCII ART, ORGANISER) - ZYX! (NO IDEA) - DARKUS (C64 GRAPHICS) - " +
        "OBVIOUSDISASTER (CODE AND GRAPHICS)...  TEXT WRAPS...    ",
      5,
    );

    // Run the moire
    if (this.moireValue >= 50000) {
      this.moireValue = 0;
    }

    if (this.moireColour >= 100) {
      this.moireColourChangeDirection = -1;
    }

    if (this.moireColour <= 0) {
      this.moireColourChangeDirection = 1;
    }

    this.moire.draw(this.moireValue, this.moireColour - 10, this.moireColour + 10, this.moireColour + 20);
    this.moireValue += 20;
    this.moireColour += this.moireColourChangeDirection;

    // Run the text writer
    this.cognition.displayContext.beginPath();
    this.cognition.displayContext.fillStyle = "#4B0082";
    this.cognition.displayContext.fillRect(330, 100, 450, 120);
    this.cognition.displayContext.stroke();
    this.textWriter.draw(this.textWriterPages, 340, 110, 5);

    // Draw an image with text
    const canIhavesomemoreimage = document.getElementById("canIhavesomemoire") as HTMLImageElement;
    this.cognition.displayContext.drawImage(canIhavesomemoreimage, 0, 320);

    this.cognition.displayContext.beginPath();
    this.cognition.displayContext.fillStyle = "#000000";
    this.cognition.displayContext.fillRect(150, 510, 390, 55);
    this.cognition.displayContext.stroke();
    this.textPrinter.draw("PLEASE SIR..", 160, 520);
    this.textPrinter.draw("CAN I HAVE SOME MOIRE?", 180, 540);

    // Draw a box for the text
    this.cognition.displayContext.beginPath();
    this.cognition.displayContext.fillStyle = "#000077";
    this.cognition.displayContext.fillRect(638, 547, 150, 42);
    this.cognition.displayContext.stroke();

    // Run the text printer
    this.textPrinter.draw("NEOKORTEX", 642, 550);
    this.textPrinter.draw("COGNITION", 642, 570);
  };
}
