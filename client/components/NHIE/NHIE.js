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
  let players = Object.keys(session.players);

  // let responses = [];
  // let obj = {}
  // db.ref("gameSessions/" + code + "/players").on("child_added", snapshot => {
  //   db.ref(`players/${snapshot.key}/nickname`).once("value", name => {
  //     snapshot.ref.child("response").on("value", res => {
  //       obj[name.val()] = res.val()
  //       console.log(res.val())
  //       if (res.val()) responses.push(res.val())
  //     })
  //   })
  //   console.log(obj)
  //   console.log(responses.length, players.length)
  //   if (responses.length === players.length) {
  //     axios.post(`/api/games/${code}`, { status: "round" });
  //   }
  // });

  return (
    <div>
      <h1>Hello World from NHIE</h1>
      {session.status === "responding" && (
        <NHIEForm
          uid={props.userId}
          code={code}
          session={session}
          players={players}
        />
      )}
    </div>
  );
};

export default NHIE;
