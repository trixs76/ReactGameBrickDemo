import {
  BRICK_COLS,
  BRICK_ROWS,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_OFFSET_LEFT,
  BRICK_OFFSET_TOP,
} from "./constants";

// Create initial brick layout
export function createBricks() {
  const bricks = [];                // 2D array

  for (let c = 0; c < BRICK_COLS; c++) {
    bricks[c] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      bricks[c][r] = {
        x: 0,
        y: 0,
        status: 1,                                    // 1 = visible, 0 = hit
        color: `hsl(${Math.random() * 360},70%,50%)`, // random color 
      };
    }
  }
  return bricks;
}

// Update brick positions based on layout constants
export function updateBrickPosition(bricks) {
  for (let c = 0; c < BRICK_COLS; c++) {
    for (let r = 0; r < BRICK_ROWS; r++) {
      const x = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
      const y = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
      bricks[c][r].x = x;
      bricks[c][r].y = y;
    }
  }
}
