import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import Stats from "./Stats";
import RecentPlayers from "./RecentPlayers";

export default function Profile(props) {
  const { userId } = props;
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
            <strong>Welcome to your profile, {player.nickname}!</strong>
          </h1>
        </div>
        <div className="row d-flex justify-content-around">
          <Stats player={player} />
          {player.recentPlayers && (
            <RecentPlayers
              recents={player.recentPlayers}
              invite={false}
              uid={userId}
            />
          )}
        </div>
      </div>
    );
  }
}
