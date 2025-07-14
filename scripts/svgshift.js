/* main.js */
import { paths } from "./svgdata.js";

const pathElem = document.getElementById("morph");
let idx = 0; // current shape index

// Set initial path
pathElem.setAttribute("d", paths[idx]);

// Tween duration (ms)
const DURATION = 300;

/**
 * Morph from current shape to next shape.
 * Uses Flubber's interpolate (returns a function mapping t∈[0,1] → pathData)
 */
function morphToNext() {
    const nextIdx = (idx + 1) % paths.length;
    const interpolator = flubber.interpolate(paths[idx], paths[nextIdx], {
        maxSegmentLength: 2
    });

    // Animate with requestAnimationFrame
    const start = performance.now();
    function step(now) {
        const t = Math.min((now - start) / DURATION, 1);
        pathElem.setAttribute("d", interpolator(t));
        if (t < 1) requestAnimationFrame(step);
        else idx = nextIdx; // commit when finished
    }
    requestAnimationFrame(step);
}

// Click anywhere in the window to trigger
window.addEventListener("click", morphToNext);
