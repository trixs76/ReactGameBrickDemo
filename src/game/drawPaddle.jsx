import paddleSrc from "./textures/paddle.png";    // path from vite config

const paddleImg = new Image();  // preload paddle image
paddleImg.src = paddleSrc;      // path from vite config

export function drawPaddle(ctx, paddle, canvasHeight) {
  const y = canvasHeight - paddle.h - 10; // 10px above bottom

  if (paddleImg.complete) {
    ctx.drawImage(
      paddleImg,
      paddle.x,
      y,
      paddle.w,
      paddle.h
    );
  } else {
    // fallback
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(paddle.x, y, paddle.w, paddle.h);
  }
}
