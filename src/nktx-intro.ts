import { Cognition } from "./cognition";
import { Starfield } from "./effects/starfield";

export class NktxIntro {
  // Initialise cognition and bind to '#screen' canvas element in HTML (change to pass canvas element id in later?)
  private static cognition: Cognition = new Cognition("screen");

  private static starfield: Starfield = new Starfield(
    this.cognition.displayWidth,
    this.cognition.displayHeight
  );

  public static run = () => {
    // Perform initialisation
    this.starfield.initialise(100, 4);

    this.loop();
  };

  private static renderFrame() {
    this.cognition.setBackgroundColour("#010B1C");
    this.starfield.draw(this.cognition.displayContext, 4);

    this.cognition.displayContext.fillStyle = "#000000";
  }

  public static loop = () => {
    // Main intro loop (assume 60fps or test for it!)
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };
}
