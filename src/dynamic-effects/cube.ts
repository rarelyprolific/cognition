/**
 * Renders a cube (work in progress - doesn't work yet!).
 */
export class Cube {
    private cx: number = 0;
    private cy: number = 0;

    // Cube dimensions
    readonly size = 100;

    // Isometric projection offsets
    readonly dx = this.size * Math.cos(Math.PI / 6); // ~86.6
    readonly dy = this.size * Math.sin(Math.PI / 6); // ~50

    constructor() {
    }

    private top: { x: number; y: number }[] = [
        { x: this.cx + 100, y: this.cy - this.size + 100 },
        { x: this.cx + this.dx + 100, y: this.cy - this.size + this.dy + 100 },
        { x: this.cx + 100, y: this.cy - this.size + 2 * this.dy + 100 },
        { x: this.cx - this.dx + 100, y: this.cy - this.size + this.dy + 100 }
    ];

    private left: { x: number; y: number }[] = [
        this.top[0],
        this.top[3],
        { x: this.top[3].x + 100, y: this.top[3].y + this.size + 100 },
        { x: this.top[0].x + 100, y: this.top[0].y + this.size + 100 }
    ];

    private right: { x: number; y: number }[] = [
        this.top[0],
        this.top[1],
        { x: this.top[1].x + 100, y: this.top[1].y + this.size + 100 },
        { x: this.top[0].x + 100, y: this.top[0].y + this.size + 100 }
    ];

    initialise(display: CanvasRenderingContext2D) {
        this.cx = display.canvas.width / 2;
        this.cy = display.canvas.height / 2;
    }

    drawFrame(display: CanvasRenderingContext2D) {
        this.drawFace(display, this.right, '#f070f5ff');   // right
        this.drawFace(display, this.top, '#f5e290ff');     // top
        this.drawFace(display, this.left, '#d3e290ff');    // left
    }

    drawFace(display: CanvasRenderingContext2D, points: { x: number; y: number }[], fillStyle: string) {
        display.beginPath();
        display.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            display.lineTo(points[i].x, points[i].y);
        }
        display.closePath();
        display.fillStyle = fillStyle;
        display.fill();
        display.stroke();
    }

}
