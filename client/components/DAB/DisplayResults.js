import React from "react";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import Guess from "./Guess";

const db = fire.database();

const DisplayResults = props => {
  const { code, drawerId, targetWord, uid } = props;
  const [playersSnap, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/players`)
  );

  if (loading) return "";
  if (error) return "error";

  const players = Object.entries(playersSnap);
  const guessors = players.filter(guessor => guessor[0] !== drawerId);
  let guessorIds = [];
  if (playersSnap[drawerId].guessors) {
    guessorIds = Object.keys(playersSnap[drawerId].guessors);
  }

  if (guessorIds.length === guessors.length) {
    return (
      <div>
        <h4>The answer is {targetWord}</h4>
        <div>
          {guessors.map(guessor => (
            <Guess
              key={guessor[0]}
              guessorNick={guessor[1].nickname}
              correct={guessor[1].correct}
              guesses={Object.values(guessor[1].responses)}
              drawerId={drawerId}
              code={code}
            />
          ))}
        </div>
      </div>
    );
  }
  if (drawerId === uid) {
    return <div>Wait while other players guess your drawing!</div>;
  }
  return <></>;
};

export default DisplayResults;
