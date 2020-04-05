import React, { useEffect, useState } from "react";
import fire from "../../fire";
import DisplayResults from "./DisplayResults";

const db = fire.database();

const HandleResponse = props => {
  const { session, code, uid, drawerId } = props;
  const playersRef = db.ref(`gameSessions/${code}/players`);
  const drawerRef = playersRef.child(drawerId);

  //guessor's info
  const { nickname, points, responses } = session.players[uid];
  //drawer's info
  const { targetWord } = session.players[drawerId];
  const drawerPoints = session.players[drawerId].points;

  const correct = responses.find(guess => guess === targetWord);

  useEffect(() => {
    if (correct) {
      //update guessor's points & document correct
      playersRef.child(uid).update({
        points: parseInt(points) + 10,
        guess: true
      });
      //update drawer's points
      playersRef
        .child(drawerId)
        .update({ points: parseInt(drawerPoints) + 10 });
    } else {
      //document incorrectly guessed
      playersRef.child(uid).update({
        guess: false
      });
    }
  }, []);

  return (
    <div>
      <DisplayResults code={code} drawerId={drawerId} targetWord={targetWord} />
    </div>
  );
};

export default HandleResponse;
