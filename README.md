# Mirror Me — Body Outline & Personal Tracker

A single-file, 100% client-side web app that uses your webcam to:

- Outline detected people live in a glowing red silhouette (TensorFlow.js BodyPix).
- Let you freehand-draw over your own outline on a transparent canvas layer.
- "Learn My Look" — sample your silhouette's color signature a few times and save a personal profile in your browser's local storage.
- "Track Me" — once a profile exists, pick you out from others in frame (you in red, others in blue-gray) with a live similarity score.
- Train custom hand gestures (TensorFlow.js Handpose): record a hand pose under a name, and the page exposes it live as `window.MirrorMeGestures["your-gesture-name"]` (`true`/`false` each frame) plus a `mirrorme:gesture` event on `window`, so you can hook your own code to a hand signal.
- Adjust camera FPS and how many times per second detection re-runs, to trade smoothness for performance.

Nothing is uploaded anywhere — video, segmentation, hand tracking, and your saved profile/gestures all stay local to your browser (localStorage).

Open `index.html` to run it locally, or use the live link below.

Live: https://raydendejesus.github.io/mirror-me/
