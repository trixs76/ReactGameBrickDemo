import { CANVAS_WIDTH,
        PADDLE_WIDTH,  
        PADDLE_HEIGHT,
 } from "./constants";

export function createPaddle() {
  return {
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    x: (CANVAS_WIDTH - 120) / 2,
    speed: 7,
  };
}

export function movePaddle(paddle, left, right) {
  if (right && paddle.x < CANVAS_WIDTH - PADDLE_WIDTH) {
    paddle.x += paddle.speed;
  }
  if (left && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }
}

export function resetPaddle(paddle) {
  paddle.x = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
}

