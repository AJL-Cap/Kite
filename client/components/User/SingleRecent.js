import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";

const SingleRecent = props => {
  const { player, gameClick, profileClick } = props;
  const playerRef = fire.database().ref(`players/${player}`);

  const [recentPlayer, loading, err] = useObjectVal(playerRef);

  if (loading) {
    return "";
  }
  if (err) {
    return <div>error!</div>;
  }
  return (
    <div className="border border-dark m-2 bg-light">
      <h4 className="card-subtitle m-2">{recentPlayer.nickname}</h4>
      <button type="button" onClick={profileClick} className="alert-danger m-2">
        Player Profile
      </button>
      <button type="button" onClick={gameClick} className="alert-danger m-2">
        Invite to A Game
      </button>
    </div>
  );
};
export default SingleRecent;
