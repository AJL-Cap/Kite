import React, { useEffect } from "react";
import UIfx from "uifx";
import sound from "../../audio/tada.wav";

const UpdateFinalPoints = props => {
  const tada = new UIfx(sound, {
    volume: 0.3, // value must be between 0.0 ⇔ 1.0
    throttleMs: 50
  });

  const { playerSnapRef, updatePointsObj, players, userId } = props;

  useEffect(
    () => {
      tada.play()
      playerSnapRef.update(updatePointsObj);
      playerSnapRef.child("recentPlayers").remove();
      players.forEach(player => {
        if (player !== userId) {
          playerSnapRef.child("recentPlayers").push(player);
        }
      });
    },
    []
  );

  return <div />;
};

export default UpdateFinalPoints;
