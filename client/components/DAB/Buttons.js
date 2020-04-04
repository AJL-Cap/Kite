import React from "react";

const Buttons = props => {
  const { sigCanvas, handleClick, setColor } = props;

  return (
    <div style={{ position: "absolute", right: "23.5%" }}>
      <button type="button" onClick={() => sigCanvas.current.clear()}>
        Reset Canvas
      </button>{" "}
      <button type="button" onClick={() => setColor("#FF474A")}>
        💔
      </button>
      <button type="button" onClick={() => setColor("#FF8349")}>
        🧡
      </button>
      <button type="button" onClick={() => setColor("#FFCA3A")}>
        💛
      </button>
      <button type="button" onClick={() => setColor("#85C629")}>
        💚
      </button>
      <button type="button" onClick={() => setColor("#1982C4")}>
        💙
      </button>
      <button type="button" onClick={() => setColor("#6A4C93")}>
        💜
      </button>
      <button type="button" onClick={() => setColor("#FF99C8")}>
        💖
      </button>
      <button type="button" onClick={() => setColor("#2D1E2F")}>
        🖤
      </button>{" "}
      <button type="button" onClick={handleClick}>
        Submit your art!
      </button>
    </div>
  );
};

export default Buttons;
