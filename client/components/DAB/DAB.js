import React, { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import NotFound from "../NotFound";

const db = fire.database();

const DAB = props => {
  const { session, code, host, userId } = props;
  const { targetWord } = session.players[userId];
  console.log(targetWord);

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
  if (!session) return <NotFound />;
  return (
    <div className="m-5 text-center">
      <h1>
        Here's your word:
        <div className="alert alert-info col border border-dark">
          {targetWord}
        </div>
      </h1>
    </div>
  );
};

export default DAB;
