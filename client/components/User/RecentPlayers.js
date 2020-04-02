import React from "react";

import SingleRecent from "./SingleRecent";

const RecentPlayers = props => {
  const { recents } = props;
  let recentPlayers = Object.values(recents);

  const profileClick = () => {
    console.log("take to player profile");
  };
  const gameClick = () => {
    console.log("invite to a game");
  };
  return (
    <>
      <div
        className="card alert-info text-dark text-center"
        style={{ width: "40rem" }}
      >
        <div className="card-body">
          <h1 className="card-title">Recent Players</h1>
          {recentPlayers.map(player => (
            <SingleRecent
              key={player}
              player={player}
              profileClick={profileClick}
              gameClick={gameClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default RecentPlayers;
