import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";

const SingleRecent = props => {
  const { player, gameClick, profileClick, invite } = props;
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
      {invite ? (
        <button type="button" onClick={gameClick} className="alert-danger m-2">
          Invite to this Game
        </button>
      ) : (
        <button
          type="button"
          onClick={() => profileClick(player)}
          className="alert-danger m-2"
        >
          Player Profile
        </button>
      )}
    </div>
  );
};
export default SingleRecent;
