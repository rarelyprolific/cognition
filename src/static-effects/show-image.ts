/**
 * Renders an image to the screen.
 */
export class ShowImage {
    private image: HTMLImageElement;

    constructor(image: HTMLImageElement) {
        this.image = image;
    }


    drawImage(
        screen: CanvasRenderingContext2D,
        xPosition: number,
        yPosition: number) {

        // Render image to screen
        screen.drawImage(this.image, xPosition, yPosition, 800, 200);
    }
}
