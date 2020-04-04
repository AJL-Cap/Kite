import React, { useState } from "react";

import SingleRecent from "./SingleRecent";
import { useHistory } from "react-router-dom";

const RecentPlayers = props => {
  const { recents, invite } = props;
  const history = useHistory();

  let recentPlayers = Object.values(recents);

  const profileClick = player => {
    console.log("take to player profile");
    history.push(`profile/${player}`);
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
              invite={invite}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default RecentPlayers;
