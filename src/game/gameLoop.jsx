import { moveBall } from "./ball";
import { movePaddle, resetPaddle } from "./paddle";
import { wallCollision, paddleCollision, brickCollision } from "./collision";

export function gameLoop({
  ball,
  paddle,
  bricks,
  scoreRef,
  livesRef,
  brickCount,
  controls,
  paused,
  resetBall,
  resetPaddle,
  onGameOver,
  onLevelComplete,
}) {
  if (paused) return;   // skip updates if paused

  wallCollision(ball);

  if (paddleCollision(ball, paddle)) {
    ball.dy = -ball.dy;
  } 
  else if (ball.y > 500) {
    livesRef.current -= 1;    // lose a life
    resetPaddle(paddle);      // reset paddle position
    
    if (livesRef.current <= 0) {
      onGameOver();
      return;
    }
    resetBall(ball);  // reset ball position
  }

  brickCollision(ball, bricks, scoreRef, brickCount, onLevelComplete);  // check for brick collisions

  moveBall(ball);
  movePaddle(paddle, controls.left, controls.right);
  
}
