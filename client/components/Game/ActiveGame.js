import React, { useState, useEffect } from "react";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import WaitingRoom from "./WaitingRoom";
import NHIE from "../NHIE/NHIE";

const db = fire.database();

const ActiveGame = props => {
  const { code } = props.match.params;
  const { userId } = props;
  const [host, setHost] = useState(false);

  //checking if the current user is the host
  useEffect(() => {
    db
      .ref(`gameSessions/${code}/players/${userId}/host`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          setHost(true);
        }
      });
  }, []);

  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  if (session.status === "waiting") {
    return (
      <WaitingRoom
        userId={props.userId}
        code={code}
        host={host}
        gameId={session.gameId}
      />
    );
  } else if (session.gameId === "1") {
    return <NHIE userId={props.userId} code={code} host={host} />;
  }
  return <div />;
};

export default ActiveGame;
