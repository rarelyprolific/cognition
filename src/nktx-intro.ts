import { Cognition } from "./cognition";
import { Starfield } from "./effects/starfield";

/**
 * NktxIntro - A simple demo to show how to use the Cognition library.
 */
export class NktxIntro {
  private static cognition: Cognition;
  private static starfield: Starfield;

  /**
   * Start the demo.
   * @param canvasHtmlElement Target <canvas> HTML element to render the demo into.
   */
  public static start = (htmlElement: HTMLElement | null) => {
    this.cognition = new Cognition(htmlElement);

    this.initialiseEffects();
    this.loop();
  };

  /**
   * Main demo loop (assume 60fps or test for it).
   */
  public static loop = () => {
    this.renderFrame();
    requestAnimationFrame(this.loop);
  };

  /**
   * Initialise effects.
   */
  private static initialiseEffects = () => {
    this.starfield = new Starfield(
      this.cognition.displayWidth,
      this.cognition.displayHeight
    );

    this.starfield.initialise(100, 4);
  };

  /**
   * Render a frame of the demo.
   */
  private static renderFrame = () => {
    this.cognition.setBackgroundColour("#010B1C");
    this.starfield.draw(this.cognition.displayContext, 4);

    this.cognition.displayContext.fillStyle = "#000000";
  };
}
