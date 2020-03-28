import React, { useEffect, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import NHIEForm from "./NHIEForm";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import ResponseDisplay from "./ResponseDisplay";
import axios from "axios";

const db = fire.database();

const NHIE = props => {
  const { code } = props;
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

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
          {/* <ResponseDisplay uid={props.userId} session={session} /> */}
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
      {session.status === "finished" && <div> HI from finished </div>}
    </div>
  );
};

export default NHIE;
