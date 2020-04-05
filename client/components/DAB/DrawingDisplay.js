import React, { useState, useEffect } from "react";
import GuessForm from "./GuessForm";

const DrawingDisplay = props => {
  const { session, code, uid } = props;
  const { turn, turnTimeStarted } = session;
  const [display, setDisplay] = useState(null);
  const drawerNick = session.players[turn].nickname;

  const { drawing } = session.players[turn];

  useEffect(() => {
    //retrieving current turn's drawing
    setDisplay(drawing);
  }, []);

  //add timer
  return (
    <div>
      <h2 className="text-center">{drawerNick}'s masterpiece</h2>
      <div style={{ margin: "2%" }}>
        <img
          src={display}
          style={{
            display: "block",
            margin: "0 auto",
            border: "2px solid black"
          }}
        />
      </div>
      <GuessForm session={session} uid={uid} code={code} drawerId={turn} />
    </div>
  );
};

export default DrawingDisplay;
