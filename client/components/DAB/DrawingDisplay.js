import React, { useState, useEffect } from "react";
import GuessForm from "./GuessForm";

const DrawingDisplay = props => {
  const { session, code, uid } = props;
  const { turn, turnTimeStarted } = session;
  const [display, setDisplay] = useState(null);
  let nickname;
  if (turn) {
    let { nickname } = session.players[turn];
  }

  // console.log("drawing", drawing);

  //add timer
  return (
    <div>
      <h2>Time to Guess!</h2>
      {turn && (
        <img
          src={session.players[turn].drawing}
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black"
          }}
        />
      )}

      <GuessForm
        session={session}
        uid={uid}
        code={code}
        drawer={nickname}
        drawerID={turn}
      />
    </div>
  );
};

export default DrawingDisplay;
