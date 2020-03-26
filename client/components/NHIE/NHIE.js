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
  const [ready, setReady] = useState(false);
  //do we really need to change the game status to responding (vs playing)?
  useEffect(() => {
    axios.post(`/api/games/${code}`, { status: "responding" });
  }, []);

  //checking if every one has submitted response
  // useEffect(() => {
  //   async function fetchReady() {
  //     const { data } = await axios.get(`/api/games/${code}/response`);
  //     console.log(data);
  //     if (data.ready) {
  //       setReady(true);
  //     }
  //   }
  //   fetchReady();
  // }, []);
  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  console.log("status", session.status);
  let players = Object.keys(session.players);
  let responses = [];
  db.ref("gameSessions/" + code + "/players").on("child_added", snapshot => {
    let responseRef = snapshot.ref.child("responding");
    responseRef.on("value", responseSnap => {
      if (responseSnap.val() === false) {
        responses.push(responseSnap.val());
      }
      console.log("response snapshot: ", responseSnap.val());
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
      {/* {ready && <ResponseDisplay uid={props.userId} session={session} />} */}
      {session.status === "round" && (
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
      )}
    </div>
  );
};

export default NHIE;
