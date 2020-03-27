import React, { useEffect } from "react";
import fire from "../../fire";
import { useObject } from "react-firebase-hooks/database";

const db = fire.database();

const RoomCodeSubmit = props => {
  const { uid, history, formCode, nick } = props;
  const [session, loading, error] = useObject(
    db.ref("gameSessions/" + formCode)
  ); // finds game session with same code

  db.ref(`gameSessions/${formCode}/gameId`);

  useEffect(
    () => {
      if (session) {
        const newPlayerRef = db.ref(
          "gameSessions/" + formCode + "/players/" + uid
        ); // only if the session already exists, i can make a reference to the new player
        newPlayerRef.set({ points: 0, nickname: nick }); // setting the new player using the ref
        history.push({
          pathname: `/games/${formCode}/`,
          state: { host: false }
        }); // redirecting to the game page
      }
    },
    [history, session, uid]
  );

  if (loading) return "";
  if (error) return <div className="alert-warning">incorrect room code</div>;
  return <></>;
};

export default RoomCodeSubmit;
