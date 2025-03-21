import { get2dDisplayContextFromCanvasElement } from "./tools/display-provider";
import { FontPrinter } from "./effects/fontprinter";
import { Starfield } from "./effects/starfield";
import { setBackgroundColour } from "./tools/background-colour-setter";

import { loadImage } from "./tools/image-loader";

import fontImageFile from "/font.png";

/**
 * NktxIntro - A simple demo to show how to use the Cognition library.
 */
export class NktxIntro {
  private static display: CanvasRenderingContext2D;
  private static fontprinter: FontPrinter
  private static starfield: Starfield;

  /**
   * Start the demo.
   * @param canvasHtmlElement Target <canvas> HTML element to render the demo into.
   */
  public static start = async (htmlElement: HTMLElement) => {
    this.display = get2dDisplayContextFromCanvasElement(htmlElement);
    //this.cognition = new Cognition(htmlElement);

    await this.initialiseEffects();
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
  private static initialiseEffects = async () => {
    // TODO: Figure out how to gracefully fail when the image fails to load.
    const bitmapFont: HTMLImageElement = await loadImage(fontImageFile);

    this.fontprinter = new FontPrinter(bitmapFont, 16, 16);

    this.starfield = new Starfield();

    this.starfield.initialise(this.display, 100, 4);
  };

  /**
   * Render a frame of the demo.
   */
  private static renderFrame = () => {
    setBackgroundColour(this.display, "#010B1C");

    this.starfield.drawFrame(this.display, 4);

    this.fontprinter.drawText(this.display, "NEOKORTEX", 300, 200);
    this.fontprinter.drawText(this.display, "COGNITION", 300, 220);
  };
}
