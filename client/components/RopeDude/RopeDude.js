import React, { useEffect, useState } from "react";
import axios from "axios";
import fire from "../../fire";
import { useObjectVal, useList } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import PlayerInfo from "./PlayerInfo";
import DisplayWord from "./DisplayWord";
import GuessLetter from "./GuessLetter";
import LetterBank from "./LetterBank";
import HangMan from "./HangMan";
import { Button } from "react-bootstrap";
import FinalGuess from "./FinalGuess";
import EndGame from "./EndGame";

const db = fire.database();

const RopeDude = props => {
  const { code, host, userId } = props;
  const [finalGuess, setFinalGuess] = useState(false);
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  useEffect(() => {
    if (host) {
      //host setting session total points to 120
      db.ref(`gameSessions/${code}`).update({
        points: 120
      });

      //setting current turn to host for testing purpose! (I assume admin backend would take care of the turn?)
      db.ref(`gameSessions/${code}`).update({
        turn: userId,
        turnTimeStarted: Date.now()
      });
    }
  }, []);

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  console.log("rope dude session: ", session);
  let players = Object.keys(session.players);

  const handleClick = () => {
    console.log("clicked");
    setFinalGuess(!finalGuess);
  };

  return (
    <div className="m-4">
      {session.status === "playing" && (
        <div>
          <DisplayWord code={code} session={session} />
          <LetterBank code={code} session={session} />
          <HangMan code={code} session={session} />
          <div className="row" id="playerDisplayPoints">
            {players.map(key => {
              return <PlayerInfo key={key} id={key} />;
            })}
          </div>
          {session.turn === userId && (
            <div>
              <GuessLetter userId={userId} code={code} session={session} />
              <Button variant="danger" onClick={handleClick}>
                Final Guess
              </Button>
              {finalGuess && <FinalGuess session={session} code={code} />}
            </div>
          )}
        </div>
      )}
      {session.status === "finished" && (
        <EndGame
          players={players}
          session={session}
          uid={props.userId}
          code={code}
        />
      )}
    </div>
  );
};

export default RopeDude;
