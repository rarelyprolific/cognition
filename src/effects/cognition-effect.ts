/**
 * Represents a demo effect that can be drawn to a canvas.
 */
export interface ICognitionEffect {
  /**
   * Initialise the effect.
   */
  initialise(...params: any[]): void;

  /**
   * Draw a frame of the effect.
   * @param screen 2D rendering context of the canvas which represents a screen to render a demo into.
   */
  draw(screen: CanvasRenderingContext2D, ...params: any[]): void;
}
