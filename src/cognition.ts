/**
 * Core cognition class which represents the "screen" of the demo hosted in a <canvas> element.
 */
export class Cognition {
  private display: HTMLCanvasElement;
  public readonly displayContext: CanvasRenderingContext2D;
  public readonly displayWidth: number;
  public readonly displayHeight: number;

  /**
   * Create a new Cognition instance.
   * @param htmlElement Target <canvas> HTML element to render the demo into.
   */
  constructor(htmlElement: HTMLElement | null) {
    this.display = this.validateCanvasHtmlElement(htmlElement);

    const displayContext: CanvasRenderingContext2D | null =
      this.display.getContext("2d");

    if (!displayContext) {
      throw new Error("Initialisation error! Canvas not supported.");
    }

    // Toggle fullscreen when user clicks canvas
    this.display.addEventListener("click", this.setFullScreen);

    this.displayContext = displayContext;
    this.displayWidth = this.display.width;
    this.displayHeight = this.display.height;
  }

  /**
   * Set the background colour of the "screen".
   * @param colour Colour to set the background to
   */
  public setBackgroundColour(colour: string) {
    this.displayContext.fillStyle = colour;
    this.displayContext.fillRect(0, 0, this.displayWidth, this.displayHeight);
  }

  /**
   * Toggles fullscreen.
   * @param clickEvent Click event to toggle fullscreen.
   */
  setFullScreen(clickEvent: MouseEvent) {
    const element = clickEvent.currentTarget as HTMLElement;

    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        // Safari probably doesn't support Fullscreen API so this probably works as an alternative.. maybe! :)
        (element as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari probably doesn't support Fullscreen API so this probably works as an alternative.. maybe! :)
        (document as any).webkitExitFullscreen();
      }
    }
  }

  /**
   * Validate the target element is a <canvas> element.
   * @param htmlElement Target <canvas> HTML element.
   */
  private validateCanvasHtmlElement(
    htmlElement: HTMLElement | null
  ): HTMLCanvasElement {
    if (!htmlElement) {
      throw new Error(
        `Initialisation error! Target element must be <canvas>. No element found.`
      );
    }

    if (!(htmlElement instanceof HTMLCanvasElement)) {
      throw new Error(
        `Initialisation error! Target element must be <canvas>. #${
          htmlElement.id
        } element is <${htmlElement.tagName.toLowerCase()}>.`
      );
    }

    return htmlElement as HTMLCanvasElement;
  }
}
