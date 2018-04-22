// TODO: Include for module replaying, put these somewhere nicer later
declare var Lite13Module: any;

class NktxTro0001 {
    // Initialise cognition and bind to '#screen' canvas element in HTML (change to pass canvas element id in later?)
    private cognition: Cognition.Core = new Cognition.Core('screen');
    private starfield: Cognition.ICognitionEffect;
    private moduleReplayer: Cognition.ModuleReplayer = new Cognition.ModuleReplayer();

    public run = () => {
        // Perform initialisation
        this.starfield = new Cognition.Starfield(this.cognition.displayWidth, this.cognition.displayHeight);
        this.starfield.initialize(100, 4);
        this.moduleReplayer.loadAndParseModule(Lite13Module);

        this.loop();
    }

    private renderFrame() {
        this.moduleReplayer.playModule();

        this.cognition.setBackgroundColour('#010B1C');
        this.starfield.draw(this.cognition.displayContext, 4);

        // TODO: Basic inline vu-meter, finish this and move into dedicated class later
        this.cognition.displayContext.fillStyle = '#FF0000';
        this.cognition.displayContext.fillRect(10, 10, 10, this.moduleReplayer.vuMeter[0] * 100);

        this.cognition.displayContext.fillStyle = '#00FF00';
        this.cognition.displayContext.fillRect(30, 10, 10, this.moduleReplayer.vuMeter[1] * 100);

        this.cognition.displayContext.fillStyle = '#000FFF';
        this.cognition.displayContext.fillRect(50, 10, 10, this.moduleReplayer.vuMeter[2] * 100);

        this.cognition.displayContext.fillStyle = '#FFFFFF';
        this.cognition.displayContext.fillRect(70, 10, 10, this.moduleReplayer.vuMeter[3] * 100);

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
