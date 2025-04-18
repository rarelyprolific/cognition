// TODO: Implement this! Very work in progress! :)
// It should be a sine scroller which zooms in and out of the screen and has a rainbow effect.
export class RainbowSineScroller {

    private charactersPerRow: number;
    private bitmapFont: HTMLImageElement;
    private fontCharacterWidth: number;
    private fontCharacterHeight: number;

    private amplitude: number;
    private frequency: number;

    //private scrollChars: ScrollChar[] = [];
    private xPosition: number;
    private yPosition: number;
    private characterColour: number = 50;

    constructor(display: CanvasRenderingContext2D, bitmapFont: HTMLImageElement, fontCharacterWidth: number, fontCharacterHeight: number) {
        //this.scrollChars = [];
        this.xPosition = display.canvas.width;
        this.yPosition = (display.canvas.height - 30) - (fontCharacterHeight / 2);

        this.bitmapFont = bitmapFont;
        this.fontCharacterWidth = fontCharacterWidth;
        this.fontCharacterHeight = fontCharacterHeight;

        // Calculate how many characters on a single row of the bitmap font
        this.charactersPerRow = this.bitmapFont.width / fontCharacterWidth;

        this.amplitude = 20;
        this.frequency = 0.05;
    }

    drawFrame(display: CanvasRenderingContext2D, textToScroll: string) {
        // Get the index of the character in the bitmap font based on the
        // ASCII character code (minus the first 32 ASCII characters)
        const characterTileIndex: number = textToScroll.charCodeAt(0) - 32;

        // Calculate which row of the bitmap font this character is on
        const characterOnRow: number = Math.floor(
            characterTileIndex / this.charactersPerRow
        );

        // Calculate the xPosition of this character in the bitmap font
        const xPositionOfCharacterInBitmapFont: number =
            characterTileIndex * this.fontCharacterWidth -
            this.charactersPerRow * this.fontCharacterWidth * characterOnRow;

        // Calculate the yPosition of this character in the bitmap font
        const yPositionOfCharacterInBitmapFont: number =
            characterOnRow * this.fontCharacterHeight;

        // Render this character to the screen
        display.drawImage(
            this.bitmapFont,
            xPositionOfCharacterInBitmapFont,
            yPositionOfCharacterInBitmapFont,
            this.fontCharacterWidth,
            this.fontCharacterHeight,
            this.xPosition,
            this.yPosition,
            this.fontCharacterWidth,
            this.fontCharacterHeight
        );

        const imageData = display.getImageData(this.xPosition, this.yPosition, this.fontCharacterWidth, this.fontCharacterHeight);
        const data = imageData.data;

        // Loop through each pixel in the imageData
        for (let i = 0; i < data.length; i += 4) {
            // Skip background pixels (may be specific to test font - check it later)
            if (data[i] + data[i + 1] + data[i + 2] == 40) {
                continue;
            }

            // Adjust the red, green, and blue channels (example: make the image grayscale)
            //const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = 0; //avg;      // Red
            data[i + 1] = 255; //avg;  // Green
            data[i + 2] = 0; //avg;  // Blue
            // data[i + 3] is the alpha channel (transparency), leave it unchanged
        }

        display.putImageData(imageData, this.xPosition, this.yPosition);

        this.characterColour += 2;
        if (this.characterColour > 150) {
            this.characterColour = 50;
        }

        this.xPosition -= 2;

        // If the character goes off the left side of the screen, reset it to the right
        if (this.xPosition < 0) {
            this.xPosition = display.canvas.width;
        }

        this.yPosition = (this.amplitude * Math.sin(this.frequency * this.xPosition)) + (display.canvas.height - 30) - (this.fontCharacterHeight / 2);
    }
}
