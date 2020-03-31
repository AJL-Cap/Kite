import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { useObject } from "react-firebase-hooks/database";
import Alert from "react-bootstrap/Alert";

const db = fire.database();

const RoomCodeSubmit = props => {
  const { uid, history, formCode, nick } = props;
  const [session, loading, error] = useObject(
    db.ref("gameSessions/" + formCode)
  ); // finds game session with same code
  const [noCode, setNoCode] = useState(false);

  useEffect(
    () => {
      if (session) {
        const newPlayerRef = db.ref(
          "gameSessions/" + formCode + "/players/" + uid
        ); // only if the session already exists, i can make a reference to the new player
        newPlayerRef.set({ nickname: nick, host: false, points: 0 }); // setting the new player using the ref
        history.push(`/games/${formCode}`); // redirecting to the game page
      } else setNoCode(true);
    },
    [history, session, uid]
  );

  if (noCode) return <Alert variant="danger">This code does not exist</Alert>;
  if (loading) return "";
  if (error) return <div className="alert-warning">incorrect room code</div>;
};

export default RoomCodeSubmit;
