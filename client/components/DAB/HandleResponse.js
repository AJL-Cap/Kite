import React, { useEffect, useState } from "react";
import fire from "../../fire";
import DisplayResults from "./DisplayResults";
import { useList, useObjectVal } from "react-firebase-hooks/database";

const db = fire.database();

const HandleResponse = props => {
  const { session, code, uid, drawerId } = props;
  const playersRef = db.ref(`gameSessions/${code}/players`);
  const drawerRef = playersRef.child(drawerId);

  //guessor's info
  const { nickname, points, responses } = session.players[uid];
  //drawer's info
  const { drawing, targetWord } = session.players[drawerId];
  const drawerNick = session.players[drawerId].nickname;
  const drawerPoints = session.players[drawerId].points;

  const correct = responses.find(guess => guess === targetWord);

  useEffect(() => {
    if (correct) {
      //update guessor's points
      playersRef.child(uid).update({
        points: parseInt(points) + 10
      });
      //update drawer's points
      playersRef
        .child(drawerId)
        .update({ points: parseInt(drawerPoints) + 10 });
      //update guessor info
      drawerRef
        .child("guessors")
        .child(nickname)
        .set(true);
    } else {
      //update guessor info
      drawerRef
        .child("guessors")
        .child(nickname)
        .set(false);
    }
  }, []);

  return (
    <div>
      <DisplayResults code={code} drawerId={drawerId} />
    </div>
  );
};

export default HandleResponse;
