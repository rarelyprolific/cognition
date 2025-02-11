namespace Cognition {

    export class Core {
        private display: HTMLCanvasElement;
        public readonly displayContext: CanvasRenderingContext2D;
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
    }
}
