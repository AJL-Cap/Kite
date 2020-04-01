import React, { useEffect } from "react";
import PlayerInfo from "./PlayerInfo";
import NHIEForm from "./NHIEForm";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import ResponseDisplay from "./ResponseDisplay";
import axios from "axios";
import EndGame from "./EndGame";

const db = fire.database();

const NHIE = props => {
  const { code, host } = props;
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
        <div>
          <NHIEForm
            userId={props.userId}
            code={code}
            rounds={session.rounds}
            host={host}
          />
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
      {session.status === "confessing" && (
        <div>
          <ResponseDisplay
            uid={props.userId}
            session={session}
            code={code}
            host={host}
          />
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

export default NHIE;
