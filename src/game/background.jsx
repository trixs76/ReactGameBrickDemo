import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

const bgImage = new Image();      // preload background image
bgImage.src = "./textures/brick_background.jpg";  // path from vite config

export function drawBackgroundImage(ctx) {
  if (bgImage.complete) {
    ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
