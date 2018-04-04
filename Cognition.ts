// TODO: Move this into a Stars module/class soon!
class Star {
    xPosition: number;
    yPosition: number;
    height: number = 2;
    width: number = 2;
}


class Cognition {
    private display: HTMLCanvasElement;
    public displayContext: CanvasRenderingContext2D;
    public readonly displayWidth: number;
    public readonly displayHeight: number;

    constructor(canvasElementId: string) {
        this.display = document.getElementById(canvasElementId) as HTMLCanvasElement;
        this.displayContext = this.display.getContext("2d");
        this.displayWidth = this.display.width;
        this.displayHeight = this.display.height;
    }

    public setBackgroundColour(colour: string) {
        this.displayContext.fillStyle = colour;
        this.displayContext.fillRect(0, 0, this.displayWidth, this.displayHeight);
    }

    // TODO: Move this into a Stars module/class soon!
    private stars: Array<Star>;

    // TODO: put this in a starfield constructor!
    public initialiseStarfield(numberOfStars: number) {
        this.stars = new Array(numberOfStars);

        for(let i=0; i < numberOfStars; i++) {
            this.stars[i] = new Star();
            this.stars[i].xPosition = Math.random() * this.displayWidth;
            this.stars[i].yPosition = Math.random() * this.displayHeight;
        }
    }

    public drawStarfield(speed: number) {
        // TODO: Generate the starfield
        //  * Generate X number of stars within the screen area at random x and y co-ords
        //  * On each frame, decrement the x co-ord of each star (scroll left)
        //  * If x co-ord is zero, set x co-ord to this.display.width and random y co-ord (new star)

        // Make the stars white
        this.displayContext.fillStyle = '#FFFFFF';

        for (let i in this.stars) {
            // Draw the star 
            this.displayContext.fillRect(this.stars[i].xPosition, this.stars[i].yPosition, this.stars[i].height, this.stars[i].height);
            // Scroll the star to the left
            this.stars[i].xPosition -= speed;
            // If the star goes off the left side of the screen, redraw it back on the right
             if(this.stars[i].xPosition < 10)
             { 
                 this.stars[i].xPosition = this.displayWidth - 10;
             }            
        }
    }
}
