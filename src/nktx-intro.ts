import { get2dDisplayContextFromCanvasElement } from "./tools/get-display";
import { setBackgroundColour } from "./tools/set-background-colour";
import { loadImage } from "./tools/load-image";
import fontImageFile from "/font.png";
import logoImageFile from "/neokortex-logo.png"


import { PrintBitmapFont } from "./static-effects/print-bitmap-font";
import { ShowImage } from "./static-effects/show-image";
import { Starfield } from "./dynamic-effects/starfield";
//import { RainbowSineScroller } from "./dynamic-effects/rainbow-sine-scroller";
import { RadialStarfield } from "./dynamic-effects/radial-starfield";
import { Cube } from "./dynamic-effects/cube"

/**
 * NktxIntro - A simple demo to show how to use the Cognition library.
 */
export class NktxIntro {
  private static display: CanvasRenderingContext2D;
  private static printBitmapFont: PrintBitmapFont;
  private static showImage: ShowImage;
  private static starfield: Starfield;
  //private static rainbowSineScroller: RainbowSineScroller;
  private static radialStarfield: RadialStarfield;
  private static cube: Cube

  /**
   * Start the demo.
   * @param canvasHtmlElement Target HTML CANVAS element to render the demo into.
   */
  public static start = async (htmlElement: HTMLElement) => {
    this.display = get2dDisplayContextFromCanvasElement(htmlElement);

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

    this.printBitmapFont = new PrintBitmapFont(bitmapFont, 16, 16);

    this.starfield = new Starfield();
    this.starfield.initialise(this.display, 100, 4);

    //this.rainbowSineScroller = new RainbowSineScroller(this.display, bitmapFont, 16, 16);

    this.radialStarfield = new RadialStarfield();
    this.radialStarfield.initialise();

    this.cube = new Cube();
    this.cube.initialise(this.display);

    const logoImage: HTMLImageElement = await loadImage(logoImageFile);
    this.showImage = new ShowImage(logoImage);
  };

  /**
   * Render a frame of the demo.
   */
  private static renderFrame = () => {
    setBackgroundColour(this.display, "#010B1C");

    this.starfield.drawFrame(this.display, 4);
    //this.radialStarfield.drawFrame(this.display);

    this.printBitmapFont.drawAlignedText(this.display, "NEOKORTEX", "center", "center", 0, -10);
    this.printBitmapFont.drawAlignedText(this.display, "COGNITION", "center", "center", 0, 10);

    //this.rainbowSineScroller.drawFrame(this.display, "SOMETHING");
    this.showImage.drawImage(this.display, 0, 400, 800, 200);

    this.cube.drawFrame(this.display);
  };
}
