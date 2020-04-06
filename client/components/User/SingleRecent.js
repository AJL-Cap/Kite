import React from "react";
import { useObjectVal, useObject } from "react-firebase-hooks/database";
import fire from "../../fire";

const SingleRecent = props => {
  const { player, profileClick, invite, code, gameId, uid } = props;
  const playerRef = fire.database().ref(`players/${player}`);

  const [recentPlayer, loading, err] = useObjectVal(playerRef);
  const [user, userLoading, error] = useObjectVal(
    fire.database().ref(`players/${uid}`)
  );

  if (loading || userLoading) {
    return "";
  }

  if (err || error || !user) {
    return <div>error!</div>;
  }
  const gameClick = () => {
    fire
      .database()
      .ref(`notifications/${player}`)
      .push({
        requestUser: user.nickname,
        code: code,
        time: Date.now()
      });
  };

  return (
    <div className="border border-dark m-2 bg-light">
      <h4 className="card-subtitle m-2">{recentPlayer.nickname}</h4>
      {invite ? (
        <button
          type="button"
          onClick={gameClick}
          className="alert-danger m-2 rounded"
        >
          Invite to this Game
        </button>
      ) : (
        <button
          type="button"
          onClick={() => profileClick(player)}
          className="alert-danger m-2 rounded"
        >
          Player Profile
        </button>
      )}
    </div>
  );
};
export default SingleRecent;
