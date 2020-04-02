import React from "react";

const Stats = props => {
  const { player } = props;
  let winPercentage = Math.round(player.wins / player.totalGamesPlayed * 100);
  return (
    <>
      <div
        className="card text-dark text-center"
        id="jumboPlayers"
        style={{ width: "35rem" }}
      >
        {player.profilePic && (
          <img
            src={player.profilePic.secure_url}
            className="card-img-top rounded"
            alt="..."
          />
        )}
        <div className="card-body border border-dark m-4 bg-light">
          <h3 className="card-text">Total Points: {player.totalPoints}</h3>
          <h3 className="card-text">Total Wins: {player.wins}</h3>
          <h3 className="card-text">
            Total Games Played: {player.totalGamesPlayed}
          </h3>
          {winPercentage ? (
            <h3 className="card-text">Winning percentage: {winPercentage}%</h3>
          ) : (
            <h3>Winning percentage: 0</h3>
          )}
        </div>
      </div>
    </>
  );
};
export default Stats;
