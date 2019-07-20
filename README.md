# Cognition

some 2d old skool demo effect fing

## WHERE SHALL WE START? (i.e. what can we realistically achieve without it taking a decade and us giving up in the process! :p)

- Make an "old skool" style intro with a starfield and text writer which plays a Pro/FastTracker module.

## NEXT PRIORITIES

- Refactor the text writer code into an ICognitionEffect implementation and out of NktxTro0002.ts.
- We may want two text print/writer implementations: One to just render a block of static text and a second one for funkier text writer effects.
- Add a simple "ImageDisplay" ICognitionEffect to show an image for NKX logos.
- Figure out module replaying: What we want to do is use Firehawk's replayer but wrap the usage of it inside a Cognition music class of some kind. Initially we probably only need to start the mod playing on init and stop it at the end. In the future, we could expose channel and player information into the render loop so we could sync effects but.. Let's start simple!

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

## Additional Credits

Uses [Firehawk's webaudio module player](https://github.com/jhalme/webaudio-mod-player) for replaying ProTracker modules.
