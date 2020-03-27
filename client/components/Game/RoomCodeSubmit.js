import React, { useEffect } from "react";
import fire from "../../fire";
import { useObject } from "react-firebase-hooks/database";

const db = fire.database();

const RoomCodeSubmit = props => {
  const { uid, history, formCode, nick } = props;
  const [session, loading, error] = useObject(
    db.ref("gameSessions/" + formCode)
  ); // finds game session with same code
  useEffect(
    () => {
      if (session) {
        const newPlayerRef = db.ref(
          "gameSessions/" + formCode + "/players/" + uid
        ); // only if the session already exists, i can make a reference to the new player
        newPlayerRef.set({ nickname: nick }); // setting the new player using the ref
        history.push(`/games/${formCode}`); // redirecting to the game page
      }
    },
    [history, session, uid]
  );

  if (loading) return "";
  if (error) return <div className="alert-warning">incorrect room code</div>;
  return <></>;
};

export default RoomCodeSubmit;
