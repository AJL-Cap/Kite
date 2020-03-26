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

  // useEffect(() => {
  //   axios.post(`/api/games/${code}`, { status: "responding" });
  // }, []);

  //checking if every one has submitted response
  useEffect(
    () => {
      async function fetchReady() {
        const { data } = await axios.get(`/api/games/${code}/response`);
        console.log(data);
        if (data.ready) {
          setReady(true);
        }
      }
      fetchReady();
    },
    [session]
  );

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  let players = Object.keys(session.players);

  return (
    <div>
      <h1>Hello World from NHIE</h1>
      <NHIEForm userId={props.userId} code={code} />
      {ready && <ResponseDisplay uid={props.userId} session={session} />}
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
  );
};

export default NHIE;
