class NktxTro0005 {
  private cognition: Cognition.Core = new Cognition.Core("screen");
  private textPrinter: Cognition.ICognitionEffect;
  private scroller: Cognition.ICognitionEffect;

  public run = () => {
    // Set up the textprinter
    this.textPrinter = new Cognition.TextPrinter();
    this.textPrinter.initialize(this.cognition.displayContext, "font", 16, 16);

    // Set up the scroller
    this.scroller = new Cognition.Scroller();
    this.scroller.initialize(this.cognition.displayContext, "font", 16, 16, this.cognition.displayWidth, 0);

    // Play music
    BassoonTracker.init(true);
    BassoonTracker.load("../assets/Monday.mod", true);

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
      "WELCOME TO THE SCROLLER!!!! LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NAM BONUM EX QUO APPELLATUM " +
        "SIT, NESCIO, PRAEPOSITUM EX EO CREDO, QUOD PRAEPONATUR ALIIS. AT ENIM, QUA IN VITA EST ALIQUID MALI, EA BEATA ESSE NON " +
        "POTEST. ILLA VIDEAMUS, QUAE A TE DE AMICITIA DICTA SUNT. QUAE QUIDEM SAPIENTES SEQUUNTUR DUCE NATURA TAMQUAM VIDENTES " +
        "AGE SANE, INQUAM. DUO REGES: CONSTRUCTIO INTERRETE.    UTINAM QUIDEM DICERENT ALIUM ALIO BEATIOREM! IAM RUINAS VIDERES. " +
        "NOS COMMODIUS AGIMUS. IMMO ALIO GENERE; EORUM ENIM OMNIUM MULTA PRAETERMITTENTIUM, DUM ELIGANT ALIQUID, QUOD SEQUANTUR, " +
        "QUASI CURTA SENTENTIA; ITAQUE HIC IPSE IAM PRIDEM EST REIECTUS; QUODSI VULTUM TIBI, SI INCESSUM FINGERES, QUO GRAVIOR " +
        "VIDERERE, NON ESSES TUI SIMILIS",
      5,
    );

    // Run the text printer
    this.textPrinter.draw("NEOKORTEX", 642, 550);
    this.textPrinter.draw("COGNITION", 642, 570);
  };
}
