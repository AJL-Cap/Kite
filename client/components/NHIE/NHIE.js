import React, { useEffect, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import NHIEForm from "./NHIEForm";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import ResponseDisplay from "./ResponseDisplay";
import axios from "axios";
import WaitingRoom from "../Game/WaitingRoom";

const db = fire.database();

const NHIE = props => {
  const code = props.match.params.code;
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );
  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  console.log("session status", session.status);
  let players = Object.keys(session.players);

  return (
    <div>
      {session.status === "waiting" && (
        <WaitingRoom code={code} userId={props.userId} />
      )}
      {session.status === "responding" && (
        <NHIEForm userId={props.userId} code={code} />
      )}
      {session.status === "round" && (
        <div>
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
    </div>
  );
};

export default NHIE;
