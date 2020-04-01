import React, { useEffect, useState } from "react";
import axios from "axios";
import fire from "../../fire";
import { useObjectVal, useList } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import PlayerInfo from "./PlayerInfo";
import DisplayWord from "./DisplayWord";
import GuessLetter from "./GuessLetter";
import LetterBank from "./LetterBank";

const db = fire.database();

const RopeDude = props => {
  const { code, host, userId } = props;
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

  let players = Object.keys(session.players);

  return (
    <div className="m-4">
      {session.status === "playing" && (
        <div>
          <DisplayWord code={code} session={session} />
          <LetterBank code={code} session={session} />
          <div className="row" id="playerDisplayPoints">
            {players.map(key => {
              return <PlayerInfo key={key} id={key} />;
            })}
          </div>
        </div>
      )}
      {session.turn === userId && (
        <GuessLetter userId={userId} code={code} session={session} />
      )}
      {/* {session.status === "finished" && (
          <EndGame players={players} session={session} uid={props.userId} />
        )} */}
    </div>
  );
};

export default RopeDude;
