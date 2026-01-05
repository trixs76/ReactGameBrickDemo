import { useRef, useEffect, useState } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT, BRICK_ROWS, BRICK_COLS, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP, PADDLE_WIDTH, PADDLE_HEIGHT } from "./game/constants";
import { createBall, resetBall } from "./game/ball";
import { createPaddle, resetPaddle } from "./game/paddle";
import { createBricks, updateBrickPosition } from "./game/bricks";
import { drawBall, drawPaddle, drawBricks, drawHUD } from "./game/draw";
import { gameLoop } from "./game/gameLoop";
import Menu from "./ui/Menu";
import { drawBackgroundImage } from "./game/background";

export default function Game() {
  const canvasRef = useRef(null);

    // menu | playing | levelComplete | gameover
    const [gameState, setGameState] = useState("menu");
    const [paused, setPaused] = useState(false);

    // ==== GAME OBJECTS ====
    const ballRef = useRef(createBall());
    const paddleRef = useRef(createPaddle());
    const bricksRef = useRef(createBricks());
    const scoreRef = useRef(0);
    const livesRef = useRef(3);
    const levelRef = useRef(1);
    const brickCount = useRef(BRICK_ROWS * BRICK_COLS);

    const controls = useRef({ left: false, right: false });

    // ==== RESET GAME ====
    const restartGame = () => {
      ballRef.current = createBall();
      paddleRef.current = createPaddle();
      bricksRef.current = createBricks();
      updateBrickPosition(bricksRef.current);

      scoreRef.current = 0;
      livesRef.current = 3;
      brickCount.current = BRICK_ROWS * BRICK_COLS;
      levelRef.current = 1;

      setPaused(false);
      setGameState("playing");
    };

    // ==== INPUT ====
    useEffect(() => {
      const down = (e) => {
        if (e.key === "ArrowLeft") controls.current.left = true;
        if (e.key === "ArrowRight") controls.current.right = true;
        if (e.key === "p") setPaused((p) => !p);
      };

      const up = (e) => {
        if (e.key === "ArrowLeft") controls.current.left = false;
        if (e.key === "ArrowRight") controls.current.right = false;
      };

      document.addEventListener("keydown", down);
      document.addEventListener("keyup", up);

      return () => {
        document.removeEventListener("keydown", down);
        document.removeEventListener("keyup", up);
      };
    }, []);

    // ==== GAME LOOP ====
    useEffect(() => {
      const canvas = canvasRef.current;       // get canvas element
      const ctx = canvas.getContext("2d");    // get context for drawing
      canvas.width = CANVAS_WIDTH;            // set canvas size
      canvas.height = CANVAS_HEIGHT;          // set canvas size

      let anim;                               // animation frame reference for cleanup

      function loop() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear canvas each frame

         // draw background
        drawBackgroundImage(ctx);

        if (gameState === "playing") {
          gameLoop({
            ctx,
            ball: ballRef.current,
            paddle: paddleRef.current,
            bricks: bricksRef.current,
            scoreRef,
            livesRef,
            brickCount,
            controls: controls.current,
            paused,
            resetBall,
            resetPaddle,
            onGameOver: () => setGameState("gameover"),
            onLevelComplete: () => setGameState("levelComplete"),
          });

          drawBricks(ctx, bricksRef.current);
          drawBall(ctx, ballRef.current);
          drawPaddle(ctx, paddleRef.current);
          drawHUD(ctx, scoreRef.current, livesRef.current, brickCount.current);

          if (paused) {
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("PAUSED", CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT / 2);
          }
        }

        anim = requestAnimationFrame(loop);
      }

      loop();

      return () => cancelAnimationFrame(anim); // cleanup on unmount or gameState change
    }, [gameState, paused]);


  return (
    <>
     {/* ===== MAIN MENU ===== */}
      {gameState === "menu" && (
        <Menu
          title="Brick"
          onStart={restartGame}
          onQuit={() => setGameState("menu")}
        />
      )}

      {/* ===== GAME OVER ===== */}
      {gameState === "gameover" && (
        <Menu
          title="Game Over"
          onStart={restartGame}
          onQuit={() => setGameState("menu")}
        />
      )}

      {/* ===== LEVEL COMPLETE ===== */}
      {gameState === "levelComplete" && (
        <Menu
          title={`LEVEL ${levelRef.current} COMPLETE`}
          onStart={() => {
            // posuň level
            levelRef.current += 1;

            // reset hernej plochy pre nový level
            bricksRef.current = createBricks();
            updateBrickPosition(bricksRef.current);
            brickCount.current = BRICK_ROWS * BRICK_COLS;

            ballRef.current = createBall();
            paddleRef.current = createPaddle();

            setGameState("playing");
          }}
          onQuit={() => setGameState("menu")}
        />
      )}


      {/* ===== CANVAS ===== */}
      <canvas ref={canvasRef} className="canvasGame" />
    </>
  );
}
