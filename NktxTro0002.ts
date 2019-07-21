class NktxTro0002 {
  private cognition: Cognition.Core = new Cognition.Core("screen");
  private starfield: Cognition.ICognitionEffect;
  private scroller: Cognition.ICognitionEffect;
  private textPrinter: Cognition.ICognitionEffect;
  private textWriter: Cognition.ICognitionEffect;
  private textWriterPages: string[] = new Array();

  public run = () => {
    // Set up the starfield
    this.starfield = new Cognition.Starfield(
      this.cognition.displayWidth,
      this.cognition.displayHeight
    );
    this.starfield.initialize(100, 4);

    // Set up the scroller
    this.scroller = new Cognition.Scroller();
    this.scroller.initialize(
      this.cognition.displayContext,
      "font",
      16,
      16,
      this.cognition.displayWidth,
      0
    );

    // Set up the textwriter
    this.textWriterPages.push("NEOKORTEX PRESENTS\n\n   A SHORT INTRO");
    this.textWriterPages.push(
      "THIS IS THE SECOND PAGE\n\nI NEED SOMETHING\nINTERESTING TO WRITE"
    );
    this.textWriterPages.push(
      "BUT I'M ON THE THIRD PAGE\nNOW AND HAVE NO INSPIRATION"
    );
    this.textWriterPages.push(
      "OH WELL!\n\nLET'S CALL IT THE END THEN...\n\n\n    WRAP!"
    );

    this.textWriter = new Cognition.TextWriter();
    this.textWriter.initialize(
      this.cognition.displayContext,
      "font",
      16,
      16,
      30
    );

    // Set up the textprinter
    this.textPrinter = new Cognition.TextPrinter();
    this.textPrinter.initialize(this.cognition.displayContext, "font", 16, 16);

    this.loop();
  };

  private renderFrame() {
    // Set the background colour
    this.cognition.setBackgroundColour("#202A25");

    // Run the starfield
    this.starfield.draw(this.cognition.displayContext, 1);

    // Run the scroller
    this.scroller.draw("THE SCROLLTEXT", 5);

    // Run the text writer
    this.textWriter.draw(this.textWriterPages, 200, 250, 5);

    // Run the text printer
    this.textPrinter.draw("NEOKORTEX", 642, 550);
    this.textPrinter.draw("COGNITION", 642, 570);
  }

  public loop = () => {
    // Main intro loop (assume 60fps or test for it!)
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };
}
