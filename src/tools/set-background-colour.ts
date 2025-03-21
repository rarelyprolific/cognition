/**
 * Set the background colour of the display.
 * @param colour Colour to set the background to
 */
export function setBackgroundColour(display: CanvasRenderingContext2D, colour: string) {
    display.fillStyle = colour;
    display.fillRect(0, 0, display.canvas.width, display.canvas.width);
}
