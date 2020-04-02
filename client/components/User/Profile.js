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
        <div className="jumbotron text-center alert-dark">
          <h1>
            <strong>Welcome to Your Profile {player.nickname}</strong>
          </h1>
        </div>
        <div className="col mb-4 align-self-center">
          <div
            className="card bg-light text-dark text-center"
            style={{ width: "35rem" }}
          >
            {player.profilePic && (
              <img
                src={player.profilePic.secure_url}
                className="card-img-top rounded"
                alt="..."
              />
            )}
            <div className="card-body">
              <h3 className="card-text">Total Points: {player.totalPoints}</h3>
              <h3 className="card-text">Total Wins: {player.wins}</h3>
              <h3 className="card-text">
                Total Games Played: {player.totalGamesPlayed}
              </h3>
              <h3 className="card-text">
                Winning percentage:{" "}
                {player.wins / player.totalGamesPlayed * 100}%
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
