/**
 * Fontprinter - Renders a string of text from the screen using a bitmap font image
 */
export class FontPrinter {

    private charactersPerRow: number;
    private bitmapFont: HTMLImageElement;
    private fontCharacterWidth: number;
    private fontCharacterHeight: number;

    constructor(bitmapFont: HTMLImageElement, fontCharacterWidth: number, fontCharacterHeight: number) {

        this.bitmapFont = bitmapFont;
        this.fontCharacterWidth = fontCharacterWidth;
        this.fontCharacterHeight = fontCharacterHeight;

        // Calculate how many characters on a single row of the bitmap font
        this.charactersPerRow = this.bitmapFont.width / fontCharacterWidth;
    }

    // TODO: Check if we need an initialise step or if we can do most of the setup in the constructor.
    // Will we ever need to re-initialise an effect?
    initialise() { }

    drawText(screen: CanvasRenderingContext2D, textToPrint: string, xPosition: number, yPosition: number) {
        let xPositionOffset = 0;

        // Render each character of the textToPrint to the screen
        for (let i = 0; i < textToPrint.length; i++) {
            // Get the index of the character in the bitmap font based on the
            // ASCII character code (minus the first 32 ASCII characters)
            const characterTileIndex: number = textToPrint.charCodeAt(i) - 32;

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
            screen.drawImage(
                this.bitmapFont,
                xPositionOfCharacterInBitmapFont,
                yPositionOfCharacterInBitmapFont,
                this.fontCharacterWidth,
                this.fontCharacterHeight,
                xPosition + xPositionOffset,
                yPosition,
                this.fontCharacterWidth,
                this.fontCharacterHeight
            );

            // Increment the xPositionOffset to "move the cursor left"
            // before rendering the next character
            xPositionOffset += this.fontCharacterWidth;
        }

    }
}
