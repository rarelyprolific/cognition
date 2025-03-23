# cognition

a 2D old skool demo thing

## How this was created

- Set up a new Vite/TypeScript project: `npm create vite@latest cognition` / `npm install`.
- Set up a devcontainer.

## How to run

- Use [Visual Studio Code](https://code.visualstudio.com/) with Dev Containers extension.
- Run from devcontainer using `npm run dev -- --host`

## Tasks still to be done

- Sort and migrate legacy logic from `historical-irrelevance` folder.
- Figure out module replayer. Can we sync effects to module?
- Phase out absolute pixel co-ordinates where possible. We need to calculate position based on a variable canvas size.
- Add a static effect to show an image.
- Can we encode ProTracker chip modules into JSON and pack into file? **Yes!** _Well, work in progress but doing it with the [Cognition.ModulePacker](https://github.com/rarelyprolific/Cognition.ModulePacker)_. Figure out a better way!

## Additional credits

Uses [Firehawk's webaudio module player](https://github.com/jhalme/webaudio-mod-player) for replaying ProTracker modules.
