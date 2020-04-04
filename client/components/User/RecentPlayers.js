import React, { useState } from "react";
import fire from "../../fire";

import SingleRecent from "./SingleRecent";
import { useHistory } from "react-router-dom";

const RecentPlayers = props => {
  const { recents, invite, uid, code, gameId } = props;
  const history = useHistory();

  let recentPlayers = Object.values(recents);

  const profileClick = player => {
    console.log("take to player profile");
    history.push(`profile/${player}`);
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
              invite={invite}
              uid={uid}
              code={code}
              gameId={gameId}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default RecentPlayers;
