import React from "react";
import fire from "../../fire";
import { useObjectVal, useListVals } from "react-firebase-hooks/database";
import { useHistory } from "react-router-dom";
import { timeSince } from "../RopeDude/util";
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
