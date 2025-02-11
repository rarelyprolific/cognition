# cognition

some 2d old skool demo effect fing

## STOP PRESS - 2025 REFURBISHMENT IN PROGRESS - STOP PRESS

- Set up a new Vite/TypeScript project.

## OLD STUFF BELOW (TODO: SORT IT LATER!)

- Make an "old skool" style intro with a starfield and text writer which plays a Pro/FastTracker module.

## NEXT PRIORITIES

- ~~Figure out module replaying: What we want to do is use Firehawk's replayer but wrap the usage of it inside a Cognition music class of some kind. Initially we probably only need to start the mod playing on init and stop it at the end. In the future, we could expose channel and player information into the render loop so we could sync effects but.. Let's start simple!~~
- ProTrackerModuleParser _probably_ works well enough now.. Let's try and write some web audio API code to play the module and see how far we get. Figure out the specifics of how to create an **AudioContext** and feed an audio stream into it via the **onaudioprocess** event. Analyse the **mix** functions in Firehawk's replayer code to figure out how to do this. We probably want to end up with the logic to do this in a ProTrackerModulePlayer class.
- ProTrackerModuleParser is a bit of a mess and still has loads of debug information in it. We need to get this out and, preferably, put into unit tests so we can verify it all works as intended. **Investigate using Jest as a possible test runner!**
- ~~We may want two text print/writer implementations: One to just render a block of static text and a second one for funkier text writer effects.~~ **DONE** But a few TODOs to clear up.
- Add a simple "ImageDisplay" ICognitionEffect to show an image for NKX logos.

## TODO

Just about everything :).. But specifically:

- Add a build process to merge Cognition.js, NktxTro0001.js and IntroLauncher.js into a single file.
- Minify the single js file.
- Pack any additional libraries into single file.
- ~Can we encode ProTracker chip modules into JSON and pack into file?~ **Yes!** Well, work in progress but doing it with the [Cognition.ModulePacker](https://github.com/rarelyprolific/Cognition.ModulePacker).
- Add effects into Cognition - This will be the demo engine!
- Use effects from NktxTro0001 - This will be the intro!
- Set up an FPS counter!
- Finish the module replayer code!
- Finish the vu-meter code!

## What tools do you need to build and run Cognition?

Cognition is at a very early stage of development. The code is likely to change significantly but, at the moment, it is just a few TypeScript classes bound to a HTML CANVAS element.

This is what I use to build and run it:

- [Visual Studio Code](https://code.visualstudio.com/) - Source code editor. Think better than a text editor for coding but without the bloat of a full IDE such as Visual Studio. It should come with the TypeScript compiler pre-installed these days too.

Here are a couple of Visual Studio Code extensions to make life easier _(install them via the Extensions section [Ctrl+Shift+X]_):

- **LiveServer** - A development HTTP server which will auto-reload pages as they change.
- **Prettier** - Auto-formats code and markup. Keeps everything tidy with minimal fuss _(only really needed if you plan on changing or writing any code)_.

## How do you build and run Cognition?

1. In Visual Studio Code, just open the Cognition repo as a folder.
2. Press **Ctrl+'** or select **Terminal->New Terminal** to open a console.
3. Type **tsc --watch** into the console. This will automatically build the code using the TypeScript compiler and wait for files to change. If you change a file it will be automatically detected and rebuilt when you save.
4. Click the **Go Live** button on the bottom-right of the status bar. This will launch the LiveServer extension and load Cognition into a browser. Each time the code changes, LiveServer will refresh.
5. _Write more code and experience instant gratification or humiliating failure without delay!_

## Additional Credits

Uses [Firehawk's webaudio module player](https://github.com/jhalme/webaudio-mod-player) for replaying ProTracker modules.
