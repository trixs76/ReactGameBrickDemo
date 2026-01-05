import paddleSrc from "/textures/paddle.png";
import {
  CANVAS_HEIGHT,
  BRICK_COLS,
  BRICK_ROWS,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
} from "./constants";

// Draw ball on canvas
export function drawBall(ctx, ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

const paddleImg = new Image();    // preload paddle image
paddleImg.src = paddleSrc;        // path from vite config

// Draw paddle on canvas
export function drawPaddle(ctx, paddle) {
  const y = CANVAS_HEIGHT - PADDLE_HEIGHT - 10;

  if (paddleImg.complete) {
    ctx.drawImage(
      paddleImg,
      paddle.x,
      y,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );
  } else {
    // fallback
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(paddle.x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
  }
}

export function drawBricks(ctx, bricks) {
  for (let c = 0; c < BRICK_COLS; c++) {
    for (let r = 0; r < BRICK_ROWS; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {   // only draw visible bricks 

        // === BASIC BRICK ===
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, BRICK_WIDTH, BRICK_HEIGHT);

        // === TOP LIGHT BORDER ===
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(b.x, b.y, BRICK_WIDTH, 3);

        // === BOTTOM DARK BORDER ===
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(
          b.x,
          b.y + BRICK_HEIGHT - 3,
          BRICK_WIDTH,
          3
        );
      }
    }
  }
}

// Draw Heads-Up Display (HUD)
export function drawHUD(ctx, score, lives, brickCount) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`Score: ${score}`, 8, 20);
  ctx.fillText(`Lives: ${lives}`, 720, 20);
  ctx.fillText(`Bricks: ${brickCount}`, 350, 20);
}
