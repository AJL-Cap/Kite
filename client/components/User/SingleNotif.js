import React from "react";
import fire from "../../fire";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import { useHistory } from "react-router-dom";
const db = fire.database();

const SingleNotif = props => {
  const { notif, id, uid } = props;
  const history = useHistory();
  const [game, loading, error] = useObjectVal(
    db.ref(`gameSessions/${notif.code}`)
  );
  const [user, userLoading, userError] = useObjectVal(db.ref(`players/${uid}`));
  if (loading) return "";
  if (error) return "ERROR";
  let gameName;
  if (game.gameId === "1") gameName = "Fess Up";
  else if (game.gameId === "2") gameName = "Rope Dude";
  const accept = () => {
    if (game) {
      const newPlayerRef = db.ref(`gameSessions/${notif.code}/players/${uid}`);
      newPlayerRef.set({ nickname: user.nickname, host: false });
      db.ref(`notifications/${uid}/${id}`).remove();
      history.push(`/games/${notif.code}`);
    }
  };
  const deny = () => {
    db.ref(`notifications/${uid}/${id}`).remove();
  };

  function timeSince(time) {
    var seconds = Math.floor((new Date() - time) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  }

  return (
    <div className="m-1 border border-dark row justify-content-between bg-light">
      <div className="column">
        <h6 className="m-2">
          {notif.requestUser} wants you to play {gameName}
        </h6>
        <p className="m-2 text muted">
          <small>{timeSince(notif.time)}</small>
        </p>
      </div>
      <button type="button" onClick={accept}>
        ✅
      </button>
      <button type="button" onClick={deny}>
        ❌
      </button>
    </div>
  );
};

export default SingleNotif;
