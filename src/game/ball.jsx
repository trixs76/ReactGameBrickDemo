import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

export function createBall() {
  return {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 30,
    r: 8,

    baseDx: 4,
    baseDy: -4,

    dx: 4,
    dy: -4,
  };
}

// Update ball position based on its velocity
export function moveBall(ball) {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Reset ball to initial position and speed
export function resetBall(ball) {
  ball.x = CANVAS_WIDTH / 2;
  ball.y = CANVAS_HEIGHT - 30;
  ball.dx = 4;
  ball.dy = -4;
}
