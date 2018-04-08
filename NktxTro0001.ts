class NktxTro0001 {
    // Initialise cognition and bind to '#screen' canvas element in HTML (change to pass canvas element id in later?)
    private cognition: Cognition.Core = new Cognition.Core('screen');
    private starfield: Cognition.ICognitionEffect;

    public run = () => {
        // Perform initialisation
        this.starfield = new Cognition.Starfield(this.cognition.displayWidth, this.cognition.displayHeight);
        this.starfield.initialize(100, 4);
        this.loop();
    }

    private renderFrame() {
        this.cognition.setBackgroundColour('#010B1C');
        this.starfield.draw(this.cognition.displayContext, 4);
   
        // TODO: Add frame counter/limiter into effect routines (assume 60fps or test for it!)
        //private frameCounter: number = 0;
        //if(this.frameCounter >= 5) {  dostuff(); this.frameCounter = 0; }
        //this.frameCounter++;
    }

    public loop = () => {
        // Main intro loop (assume 60fps or test for it!)
        this.renderFrame();
        requestAnimationFrame(this.loop);
    }
}
