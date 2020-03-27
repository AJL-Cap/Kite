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
  const code = props.match.params.code;
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  useEffect(() => {
    axios.post(`/api/games/${code}`, { status: "responding" });
  }, []);

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;

  //console.log("status", session.status);

  let players = Object.keys(session.players);
  let responses = [];
  db.ref("gameSessions/" + code + "/players").on("child_added", snapshot => {
    let responseRef = snapshot.ref.child("responding");
    responseRef.on("value", responseSnap => {
      if (responseSnap.val() === false) {
        responses.push(responseSnap.val()); //this is the array on line
      }
      // console.log("response snapshot: ", responseSnap.val());
    });
    if (responses.length === players.length) {
      axios.post(`/api/games/${code}`, { status: "round" });
    }
  });

  return (
    <div>
      <h1>Hello World from NHIE</h1>
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
