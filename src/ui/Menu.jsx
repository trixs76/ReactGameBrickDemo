import "./Menu.css";

export default function Menu({ title, onStart, onRestart, onQuit }) {
  return (
    <div className="menu-overlay">
      <div className="menu">
        <h1>{title}</h1>

        <button onClick={onStart}>Start</button>
        <button onClick={onRestart}>Restart</button>

        <button className="quit" onClick={onQuit}>
          Quit
        </button>
      </div>
    </div>
  );
}
