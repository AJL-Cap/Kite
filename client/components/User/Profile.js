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

  const handleClick = () => {
    props.history.push(`/profile/edit`);
  };
  if (player) {
    return (
      <div>
        <div className="jumbotron text-center alert-dark">
          <h1>
            <strong>Welcome to your profile, {player.nickname}!</strong>
          </h1>
        </div>
        <div className="row justify-content-start">
          <button
            className="alert-info text-dark m-3 border border-dark rounded"
            type="button"
            onClick={handleClick}
          >
            Edit Profile
          </button>
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
