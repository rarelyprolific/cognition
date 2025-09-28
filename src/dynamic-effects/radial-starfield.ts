/**
 * Renders a radial starfield (work in progress).
 */
export class RadialStarfield {
    private stars: Star[];

    constructor() {
        this.stars = [];
    }

    initialise(numDots = 100) {
        for (let i = 0; i < numDots; i++) {
            this.stars.push(this.createStar());
        }
    }

    drawFrame(display: CanvasRenderingContext2D) {
        for (const dot of this.stars) {
            this.updateStar(display, dot);
        }
    }

    createStar() {
        const angle = Math.random() * 2 * Math.PI;
        return {
            angle,
            radius: 0,
            speed: 2 + Math.random() * 3,
            size: 1 + Math.random() * 2
        };
    }

    updateStar(display: CanvasRenderingContext2D, star: Star) {
        star.radius += star.speed;
        star.size += 0.05;

        const w = display.canvas.width;
        const h = display.canvas.height;
        const x = (display.canvas.width / 2) + star.radius * Math.cos(star.angle);
        const y = (display.canvas.height / 2) + star.radius * Math.sin(star.angle);

        display.beginPath();
        display.arc(x, y, star.size, 0, 2 * Math.PI);
        display.fillStyle = `rgba(255, 255, 255, ${1 - star.radius / w})`;
        display.fill();

        if (x < 0 || x > w || y < 0 || y > h) {
            Object.assign(star, this.createStar());
        }
    }
}

/**
 * Represents a star in the starfield.
 */
interface Star {
    angle: number;
    radius: number;
    speed: number;
    size: number;
}
