import React, { useEffect, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import NHIEForm from "./NHIEForm";
import fire from "../../fire";
import { useObjectVal, useList } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import ResponseDisplay from "./ResponseDisplay";
import axios from "axios";
import EndGame from "./EndGame";

const db = fire.database();

const NHIE = props => {
  const { code, host } = props;
  //console.log("nhie host?", host);
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  useEffect(() => {
    if (host) {
      //host changing game status to responding
      axios.post(`/api/games/${code}`, { status: "responding" });
      //host setting everyone's game points to 100
      db
        .ref(`gameSessions/${code}/players`)
        .once("value")
        .then(snapshot => {
          snapshot.forEach(childSnap => {
            childSnap.ref.update({ points: 100 });
          });
        });
    }
  }, []);

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;

  let players = Object.keys(session.players);

  return (
    <div>
      {session.status === "responding" && (
        <NHIEForm userId={props.userId} code={code} rounds={session.rounds} />
      )}
      {session.status === "confessing" && (
        <div>
          <h1>Hi from confessing </h1>
          <ResponseDisplay uid={props.userId} session={session} />
          <div className="row" id="playerDisplayPoints">
            {players.map(key => {
              return (
                <PlayerInfo
                  points={session.players[key].points}
                  key={key}
                  id={key}
                />
              );
            })}
          </div>
        </div>
      )}
      {session.status === "finished" && (
        <EndGame players={players} session={session} />
      )}
    </div>
  );
};

export default NHIE;
