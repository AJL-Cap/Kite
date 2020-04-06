import React, { useEffect } from "react";

const UpdateFinalPoints = props => {
  const { playerSnapRef, updatePointsObj, players, userId } = props;

  useEffect(
    () => {
      playerSnapRef.update(updatePointsObj);
      playerSnapRef.child("recentPlayers").remove();
      players.forEach(player => {
        if (player !== userId) {
          playerSnapRef.child("recentPlayers").push(player);
        }
      });
    },
    [players, updatePointsObj]
  );

  return <div />;
};

export default UpdateFinalPoints;
