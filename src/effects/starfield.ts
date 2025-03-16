import { ICognitionEffect } from "./cognition-effect";

/**
 * Represents a star in the starfield.
 */
interface Star {
  xPosition: number;
  yPosition: number;
  height: number;
  width: number;
  velocity: number;
  colour: string;
}

/**
 * Starfield
 */
export class Starfield implements ICognitionEffect {
  private stars: Star[];
  public readonly displayWidth: number;
  public readonly displayHeight: number;

  constructor(displayWidth: number, displayHeight: number) {
    this.stars = new Array();

    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
  }

  initialise(numberOfStars: number, starfieldPlanes: number) {
    for (let sfp = 0; sfp < starfieldPlanes; sfp++) {
      let starsInPlane: Array<Star> = new Array(numberOfStars);

      for (let s = 0; s < numberOfStars; s++) {
        starsInPlane[s] = {} as Star;
        starsInPlane[s].xPosition = Math.random() * this.displayWidth;
        starsInPlane[s].yPosition = Math.random() * this.displayHeight;
        starsInPlane[s].width = sfp + 1;
        starsInPlane[s].height = sfp + 1;
        starsInPlane[s].velocity = sfp + 1;

        // Make every star white for now.. But come back and do something more clever later
        starsInPlane[s].colour = "#FFFFFF";
      }

      this.stars = this.stars.concat(starsInPlane);
    }
  }

  draw(screen: CanvasRenderingContext2D, speed: number) {
    // TODO: Generate the starfield
    //  * Generate X number of stars within the screen area at random x and y co-ords
    //  * On each frame, decrement the x co-ord of each star (scroll left)
    //  * If x co-ord is zero, set x co-ord to this.display.width and random y co-ord (new star)

    for (let i in this.stars) {
      // Draw the star
      screen.fillStyle = this.stars[i].colour;
      screen.fillRect(
        this.stars[i].xPosition,
        this.stars[i].yPosition,
        this.stars[i].height,
        this.stars[i].height
      );
      // Scroll the star to the left
      this.stars[i].xPosition -= speed + this.stars[i].velocity;
      // If the star goes off the left side of the screen, redraw it back on the right
      if (this.stars[i].xPosition < 0) {
        this.stars[i].xPosition = this.displayWidth;
      }
    }
  }
}
