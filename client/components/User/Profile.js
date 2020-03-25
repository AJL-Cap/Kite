import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";

export default function Profile({ userId }) {
  const playerRef = fire.database().ref(`players/${userId}`);

  const [player, loading, err] = useObjectVal(playerRef);

  if (loading) {
    return "";
  }
  if (err) {
    return <div>error!</div>;
  }
  if (player) {
    return (
      <div>
        <div>Nickname: {player.nickname}</div>
        <div>Total Points: {player.totalPoints}</div>
        <div>Total Wins: {player.wins}</div>
        <div>Total Games: {player.totalGamesPlayed}</div>
        {player.totalGamesPlayed !== 0 && (
          <div>
            Winning percentage: {(player.wins / player.totalGamesPlayed) * 100}%
          </div>
        )}
        <img src={player.profilePic} alt="" />
      </div>
    );
  }
}
