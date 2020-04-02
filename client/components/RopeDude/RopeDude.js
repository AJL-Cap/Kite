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
    <div className="container-xl mx-5">
      {session.status === "playing" && (
        <div className="row">
          <div className="col" id="playerDisplayPoints">
            <div
              className="jumbotron text-center justify-content-center"
              id="jumboPlayers"
              style={{ width: "16rem" }}
            >
              <h2>
                <strong>Players: </strong>
              </h2>
              {players.map(key => {
                return <PlayerInfo key={key} id={key} code={code} />;
              })}
            </div>
          </div>
          <div className="col-10">
            <div className="jumbotron text-center">
              <DisplayWord code={code} session={session} />
            </div>
            <LetterBank code={code} session={session} />
            <HangMan code={code} session={session} />
            <br />
            <div className="row">
              {session.turn === userId && (
                <div className="card" style={{ width: "100rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">Submit a guess!</h5>
                    <div className="card-subtitle mb-2 text-muted" />
                    <GuessLetter
                      userId={userId}
                      code={code}
                      session={session}
                    />
                    <Button className="alert-danger" onClick={handleClick}>
                      Final Guess
                    </Button>
                    {finalGuess && <FinalGuess />}
                  </div>
                </div>
              )}
            </div>
          </div>
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
