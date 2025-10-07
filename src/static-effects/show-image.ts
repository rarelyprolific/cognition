/**
 * Renders an image to the screen.
 */
export class ShowImage {
    private image: HTMLImageElement;

    private time: number;

    private readonly maxTime: number = Math.PI * 2;

    constructor(image: HTMLImageElement) {
        this.image = image;
        this.time = 0;
    }


    drawImage(
        screen: CanvasRenderingContext2D,
        xPosition: number,
        yPosition: number,
        width: number,
        height: number) {

        // Render image to screen
        screen.drawImage(this.image, xPosition + 120, yPosition - 360, width, height);

        // Sine image
        const waveAmplitude = 30; // Max vertical displacement
        const waveFrequency = 0.005; // Controls wave width

        //const stripHeight = 2; // Height of each horizontal slice
        const stripWidth = 2; // Height of each horizontal slice

        // for (let y = 0; y < this.image.height; y += stripHeight) {
        //     const offset = Math.sin(y * waveFrequency + this.time) * waveAmplitude;
        //     screen.drawImage(
        //         this.image,
        //         0,
        //         y,
        //         800,
        //         stripHeight, // Source slice
        //         offset,
        //         y,
        //         800,
        //         stripHeight // Destination with offset
        //     );
        // }

        // this.time += 0.1;

        // // Horizontal sine
        // for (let y = 0; y < this.image.height; y += stripHeight) {
        //     const offset = Math.sin(y * waveFrequency + this.time) * waveAmplitude;
        //     screen.drawImage(this.image, 0, y, 950, stripHeight, offset - 80, y + 400, 950, stripHeight);
        // }

        if (this.time > this.maxTime) {
            this.time = 0;
        }

        // Vertical sine
        for (let x = 0; x < this.image.width; x += stripWidth) {
            const offset = Math.sin(x * waveFrequency + this.time) * waveAmplitude;
            screen.drawImage(this.image, x, 0, stripWidth, 200, x - 80, offset + 400, stripWidth, 200);
        }

        this.time += 0.1;
    }
}
