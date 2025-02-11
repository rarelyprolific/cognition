/**
 * Represents a demo effect that can be drawn to a canvas.
 */
export interface ICognitionEffect {
  initialise(...params: any[]): void;
  draw(displayContext: CanvasRenderingContext2D, ...params: any[]): void;
}
