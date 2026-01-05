import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BRICK_COLS,
  BRICK_ROWS,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  MAX_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BRICK_LEVEL1,
} from "./constants";

// Check for collisions between ball and walls
export function wallCollision(ball) {
  if (ball.x + ball.dx > CANVAS_WIDTH - ball.r || ball.x + ball.dx < ball.r) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.r) {
    ball.dy = -ball.dy;
  }
}

// Check for collision between ball and paddle
export function paddleCollision(ball, paddle) {
  return (
    ball.y + ball.dy > CANVAS_HEIGHT - ball.r - PADDLE_HEIGHT &&
    ball.x > paddle.x &&
    ball.x < paddle.x + PADDLE_WIDTH
  );
}

// Check for collisions between ball and bricks
export function brickCollision(ball, bricks, scoreRef, brickCount, onLevelComplete) {
  for (let c = 0; c < BRICK_COLS; c++) {
    for (let r = 0; r < BRICK_ROWS; r++) {
      const b = bricks[c][r];

      if (
        b.status === 1 &&
        ball.x > b.x &&
        ball.x < b.x + BRICK_WIDTH &&
        ball.y > b.y &&
        ball.y < b.y + BRICK_HEIGHT
        ) {
          ball.dy = -ball.dy;
          b.status = 0;         // mark brick as hit

          // SCORE
          scoreRef.current+=1;
          brickCount.current-=1;

          // LEVEL UP
        if (brickCount.current === 0) {
          onLevelComplete(); // level complete callback
        }

          // acceleration every 10 points
        if (scoreRef.current > 0 && scoreRef.current % 10 === 0) {
          ball.dx *= 1.1;
          ball.dy *= 1.1;
        }

      }
    }
  }
}

