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
   * @param displayContext 2D rendering context of the canvas
   */
  draw(displayContext: CanvasRenderingContext2D, ...params: any[]): void;
}
