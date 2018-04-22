// TODO: Includes for module replaying, put these somewhere nicer later
declare var Modplayer: any;
declare var Lite13Module: any;

class NktxTro0001 {
    // Initialise cognition and bind to '#screen' canvas element in HTML (change to pass canvas element id in later?)
    private cognition: Cognition.Core = new Cognition.Core('screen');
    private starfield: Cognition.ICognitionEffect;
    private moduleReplayer: any = new Modplayer();
    private isModulePlaying: boolean = false;

    public run = () => {
        // Perform initialisation
        this.starfield = new Cognition.Starfield(this.cognition.displayWidth, this.cognition.displayHeight);
        this.starfield.initialize(100, 4);

        // TODO: Move all the module replayer stuff into a dedicated Cognition.ModuleReplayer class when I've got it working

        // Load the module
        var encodedModule = window.atob(Lite13Module);

        // Decode the module back from base64 into a byte array
        var moduleLength = encodedModule.length;
        var moduleBytes = new Uint8Array(new ArrayBuffer(encodedModule.length));
      
        for(let i = 0; i < moduleLength; i++) {
          moduleBytes[i] = encodedModule.charCodeAt(i);
        }

        // So, here's the hack, I'm using Firehawk's player.js code to load the module and play it via the pt.js replayer routine.
        // Currently, player.js wants to load a module via AJAX so I'm giving it a zero byte "fake.mod" file to keep it happy. At the same time
        // I'm passing in the bytes of the decoded module and I've tweaked player.js to pass these to the pt.js replayer.
        this.moduleReplayer.load('assets/fake.mod', moduleBytes);

        // TODO: Sort out this mess :) Basically I need to code my own, simpler, version of player.js which loads module bytes into the pt.js replayer
        // directly. I'd also like to embed the base64 to bytes conversion in the module JS file itself for tidiness (extend Cognition.ModulePacker to do this!).

        this.loop();
    }

    private renderFrame() {
        this.cognition.setBackgroundColour('#010B1C');
        this.starfield.draw(this.cognition.displayContext, 4);

        // TODO: Start module replay if it has been loaded and is not currently playing. We can't do this in the initialisation stage
        //       because the module is loaded asynchronously via an AJAX request. But, we can later when we embed/inline the module in the code.
        if(!this.moduleReplayer.loading && !this.isModulePlaying){
            this.moduleReplayer.play();
            this.isModulePlaying = true;
        }

        // TODO: Basic inline vu-meter, finish this and move into dedicated class later
        this.cognition.displayContext.fillStyle = '#FF0000';
        this.cognition.displayContext.fillRect(10, 10, 10, this.moduleReplayer.chvu[0] * 10);

        this.cognition.displayContext.fillStyle = '#00FF00';
        this.cognition.displayContext.fillRect(30, 10, 10, this.moduleReplayer.chvu[1] * 100);

        this.cognition.displayContext.fillStyle = '#000FFF';
        this.cognition.displayContext.fillRect(50, 10, 10, this.moduleReplayer.chvu[2] * 100);

        this.cognition.displayContext.fillStyle = '#FFFFFF';
        this.cognition.displayContext.fillRect(70, 10, 10, this.moduleReplayer.chvu[3] * 100);

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
