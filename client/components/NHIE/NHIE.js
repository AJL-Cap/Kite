import React from "react";
import PlayerInfo from "./PlayerInfo";
import NHIEForm from "./NHIEForm";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from '../NotFound'
import ResponseDisplay from './ResponseDisplay'

const db = fire.database();

const NHIE = props => {
  const code = props.match.params.code
  const [session, loading, error] = useObjectVal(db.ref("gameSessions/" + code));
  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  let players = Object.keys(session.players);

  return (
    <div>
      <h1>Hello World from NHIE</h1>
      <NHIEForm {...props} code={code} />
      {/* {session.status === 'playing' && <ResponseDisplay uid={props.userId} session={session} />} */}
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
