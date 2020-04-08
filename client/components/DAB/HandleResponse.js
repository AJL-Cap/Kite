import React, { useEffect, useState } from "react";
import fire from "../../fire";
import UIfx from "uifx";
import sound from "../../audio/miao.wav";
import sound2 from "../../audio/wrong.mp3";

const db = fire.database();

const HandleResponse = props => {
  const right = new UIfx(sound, {
    volume: 0.3, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const wrong = new UIfx(sound2, {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 50
  });
  const { session, code, uid, drawerId } = props;
  const playersRef = db.ref(`gameSessions/${code}/players`);
  const drawersGuessorRef = playersRef.child(drawerId).child("guessors");

  //guessor's info
  const { nickname, points, responses } = session.players[uid];
  //drawer's info
  const { targetWord } = session.players[drawerId];
  const drawerPoints = session.players[drawerId].points;

  const correct = responses.find(guess => guess === targetWord);

  useEffect(() => {
    if (correct) {
      right.play();
      //update guessor's points & document correct
      playersRef.child(uid).update({
        points: parseInt(points) + 20,
        correct: true
      });
      //update drawer's points
      playersRef
        .child(drawerId)
        .update({ points: parseInt(drawerPoints) + 20 });
    } else {
      wrong.play();
      //document incorrectly guessed
      playersRef.child(uid).update({
        correct: false
      });
    }
    //record guessors
    drawersGuessorRef.child(uid).set(true);
  }, []);

  return <div />;
};

export default HandleResponse;
