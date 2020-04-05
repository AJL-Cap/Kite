import React, { useEffect, useState } from "react";
import fire from "../../fire";
import NotFound from "../NotFound";
import SigCanvas from "./SigCanvas";
import DrawingDisplay from "./DrawingDisplay";
import { useObjectVal } from "react-firebase-hooks/database";
const db = fire.database();
const DAB = props => {
  const { code, host, userId } = props;
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );
  useEffect(() => {
    if (host) {
      //host setting everyone's game points to 0
      db
        .ref(`gameSessions/${code}/players`)
        .once("value")
        .then(snapshot => {
          snapshot.forEach(childSnap => {
            childSnap.ref.update({ points: 0 });
          });
        });
    }
  }, []);
  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  const { targetWord } = session.players[userId];
  return (
    <div>
      {session.status === "playing" && (
        <div className="m-5 text-center">
          <h1>
            Here's your word:
            <div className="alert alert-info col border border-dark">
              {targetWord}
            </div>
          </h1>
          <br />
          <SigCanvas session={session} uid={userId} code={code} />
        </div>
      )}
      {session.status === "guessing" && (
        <div>
          <DrawingDisplay session={session} uid={userId} code={code} />
        </div>
      )}
      {session.status === "finished" && <div>Finished</div>}
    </div>
  );
};
export default DAB;
