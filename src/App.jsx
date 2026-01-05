import Game from "./Game";

export default function App() {
  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1>Brick Game</h1>
      <p>← → move | P = pause</p>
      <Game />
      <p>TRIXS 2026</p>
    </div>
  );
}
