// TODO: Include for module replaying, put these somewhere nicer later
declare var Modplayer: any;

namespace Cognition {
    export class ModuleReplayer {
        private modplayer: any = new Modplayer();
        private isModulePlaying: boolean = false;

        public get vuMeter() : any {
            return this.modplayer.chvu;
        }

        public loadAndParseModule(moduleToPlay: any) {
            // Load the module
            var encodedModule = window.atob(moduleToPlay);

            // Decode the module back from base64 into a byte array
            var moduleLength = encodedModule.length;
            var moduleBytes = new Uint8Array(new ArrayBuffer(encodedModule.length));
        
            for(let i = 0; i < moduleLength; i++) {
                moduleBytes[i] = encodedModule.charCodeAt(i);
            }

            // So, here's the hack, I'm using Firehawk's player.js code to load the module and play it via the pt.js replayer routine.
            // Currently, player.js wants to load a module via AJAX so I'm giving it a zero byte "fake.mod" file to keep it happy. At the same time
            // I'm passing in the bytes of the decoded module and I've tweaked player.js to pass these to the pt.js replayer.
            this.modplayer.load('assets/fake.mod', moduleBytes);

            // TODO: Sort out this mess :) Basically I need to code my own, simpler, version of player.js which loads module bytes into the pt.js replayer
            // directly. I'd also like to embed the base64 to bytes conversion in the module JS file itself for tidiness (extend Cognition.ModulePacker to do this!).
        }

        public playModule() {
            // TODO: Start module replay if it has been loaded and is not currently playing. We can't do this in the initialisation stage
            //       because the module is loaded asynchronously via an AJAX request. But, we can later when we embed/inline the module in the code.
            if(!this.modplayer.loading && !this.isModulePlaying){
                this.modplayer.play();
                this.isModulePlaying = true;
            }
        }
    }
}