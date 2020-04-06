import React, { useState, useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import GuessForm from "./GuessForm";
import DisplayResults from "./DisplayResults";
import Timer from "../Game/Timer";
import fire from "../../fire";

const db = fire.database();

const DrawingDisplay = props => {
  const { session, code, uid, targetWord } = props;
  const [nick, setNick] = useState("");

  const [turnTimeStarted, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/turnTimeStarted`)
  );

  const [turnPlayerID, loadingTurn, errorTurn] = useObjectVal(
    db.ref(`gameSessions/${code}/turn`)
  );

  useEffect(
    () => {
      if (session && turnPlayerID)
        setNick(session.players[turnPlayerID].nickname);
    },
    [session, turnPlayerID]
  );

  if (loading || loadingTurn) return "";
  if (error || errorTurn) return "error";

  const numPlayers = Object.keys(session.players).length;
  let timeForRound = 10 + numPlayers * 10;

  return (
    <div>
      <div className="row justify-content-center">
        {turnTimeStarted && (
          <Timer roundTime={turnTimeStarted} time={timeForRound} />
        )}
      </div>
      <h2 className="text-center">{nick}'s masterpiece</h2>
      {turnPlayerID && (
        <div style={{ margin: "2%" }}>
          <img
            src={session.players[turnPlayerID].drawing}
            style={{
              display: "block",
              margin: "0 auto",
              border: "2px solid black"
            }}
          />
        </div>
      )}
      {turnPlayerID && (
        <GuessForm
          session={session}
          uid={uid}
          code={code}
          drawerId={turnPlayerID}
        />
      )}
    </div>
  );
};

export default DrawingDisplay;
