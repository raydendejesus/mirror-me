# Mirror Me — Body Outline & Personal Tracker

A single-file, 100% client-side web app that uses your webcam(s) to:

- Outline everyone it detects live, using TensorFlow.js BodyPix segmentation.
- Register multiple named people — "Learn This Person" (or the open-ended "Record Training Photos," which keeps capturing until you click Stop) samples someone's visual signature and saves it locally. "Add More Samples" improves an existing person instead of starting over. Each registered person gets their own outline color and name label; unrecognized people show up in gray, and if nobody's registered yet, everyone's just outlined in red.
- Expose live recognition to your own code: `window.MirrorMePeople["Name"]` is `true`/`false` each frame, `window.MirrorMePeople._visible` lists everyone currently matched, and a `mirrorme:person` event fires on `window` with `{ name, active, similarity }` whenever someone enters or leaves frame.
- Track both hands at once (Google's MediaPipe HandLandmarker, with left/right handedness) and draw a live per-finger skeleton.
- Train custom hand gestures the same way as people — record one under a name, and it's exposed as `window.MirrorMeGestures["gesture-name"]` plus a `mirrorme:gesture` event, so you can trigger your own code off a hand signal.
- Let you freehand-draw over your own outline on a transparent canvas layer.
- Run a second, independent camera at the same time as a live viewer (recognizes and labels people too, but doesn't drive the Learn/Record controls — those stay on camera 1).
- Pick which camera to use from a dropdown once permission's granted, and switch cameras without reloading the page.
- Choose body-outline quality: a fast MobileNet model, or a slower-but-more-accurate ResNet50 model.
- Adjust camera FPS and how many times per second detection re-runs, to trade smoothness for performance.

Nothing is uploaded anywhere — video, segmentation, hand tracking, and everyone's saved profiles/gestures stay local to your browser (localStorage).

**Honest limitation:** recognition is based on a lightweight color/shape signature, not face recognition. Changing your shirt or the lighting can break a match, and it works best with one person at a time in frame. "Add More Samples" in different outfits helps it generalize.

## Running it locally

Camera access and the AI models need a real HTTP origin — opening `index.html` directly as a `file://` page will likely fail to load the models or keeps re-asking for camera permission. Instead:

- Double-click **`START_MIRROR_ME.bat`** — it starts a small local server (`serve.js`, bound to `127.0.0.1` only, not reachable from other devices on your network) and opens the app at `http://localhost:8787/`.
- Leave that server window open while you use the app; closing it stops the server.

Live (GitHub Pages, no local server needed): https://raydendejesus.github.io/mirror-me/
