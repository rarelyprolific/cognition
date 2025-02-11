import { Cognition } from "./Cognition";
import { ICognitionEffect } from "./effects/ICognitionEffect";
import { Starfield } from "./effects/Starfield";

export class NktxIntro {
  // Initialise cognition and bind to '#screen' canvas element in HTML (change to pass canvas element id in later?)
  private cognition: Cognition = new Cognition("screen");
  private starfield: ICognitionEffect;

  constructor() {
    this.starfield = new Starfield(
      this.cognition.displayWidth,
      this.cognition.displayHeight
    );
  }

  public run = () => {
    // Perform initialisation
    this.starfield.initialise(100, 4);

    this.loop();
  };

  private renderFrame() {
    this.cognition.setBackgroundColour("#010B1C");
    this.starfield.draw(this.cognition.displayContext, 4);

    this.cognition.displayContext.fillStyle = "#000000";
  }

  public loop = () => {
    // Main intro loop (assume 60fps or test for it!)
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };
}
