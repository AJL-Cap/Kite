/* eslint-disable complexity */
import React from "react";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import Guess from "./Guess";

const db = fire.database();

const DisplayResults = props => {
  const { code, targetWord, uid } = props;
  const [turnSnap, turnLoading, turnErr] = useObjectVal(
    db.ref(`gameSessions/${code}/turn`)
  );
  const [playersSnap, loading, error] = useObjectVal(
    db.ref(`gameSessions/${code}/players`)
  );

  if (loading || turnLoading) return "";
  if (error || turnErr) return "error";
  //getting guessors from drawer's db (= those who submitted responses):
  let drawerGuessors = [];
  if (playersSnap[turnSnap].guessors) {
    drawerGuessors = Object.keys(playersSnap[turnSnap].guessors);
  }

  //getting all players info from session which include nickname,responses & correct (boolean):
  const players = Object.entries(playersSnap);
  //and filtering out the drawer so we only have players who are suppose to guess (regardless of whether they submitted respones for the current round):
  const guessors = players.filter(guessor => guessor[0] !== turnSnap);

  //and further filtering players info so we only have those that submitteed responses for the current round:
  let filteredGuessors = [];
  for (let i = 0; i < guessors.length; i++) {
    for (let j = 0; j < drawerGuessors.length; j++) {
      if (guessors[i][0] === drawerGuessors[j]) {
        filteredGuessors.push([guessors[i][0], guessors[i][1]]);
      }
    }
  }
  console.log("filtered", filteredGuessors);
  if (turnSnap === uid) {
    // if there is at least one player who guessed
    if (drawerGuessors.length > 0) {
      console.log("drew and at least 1 guessed", drawerGuessors);
      return (
        <div>
          <h4>The answer is {targetWord}</h4>
          <div>
            {filteredGuessors.map(guessor => (
              <Guess
                key={guessor[0]}
                guessorNick={guessor[1].nickname}
                correct={guessor[1].correct}
                guesses={Object.values(guessor[1].responses)}
                drawerId={turnSnap}
                code={code}
              />
            ))}
          </div>
        </div>
      );
    } else {
      console.log("drew but no one has guessed yet");
      return <div>Wait while other players guess your drawing!</div>;
    }
  } else {
    console.log("did not draw and guessed", drawerGuessors);
    return (
      <div>
        <h4>The answer is {targetWord}</h4>
        <div>
          {filteredGuessors.map(guessor => (
            <Guess
              key={guessor[0]}
              guessorNick={guessor[1].nickname}
              correct={guessor[1].correct}
              guesses={Object.values(guessor[1].responses)}
              drawerId={turnSnap}
              code={code}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default DisplayResults;
