import React from "react";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import axios from "axios";
import WaitingRoom from "./WaitingRoom";
import NHIE from "../NHIE/NHIE";

const db = fire.database();

const ActiveGame = props => {
  const { code } = props.match.params;
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;
  if (session.status === "waiting") {
    return <WaitingRoom userId={props.userId} code={code} />;
  } else if (session.gameId === "1") {
      return <NHIE userId={props.userId} code={code} />;
    }
  return <div />;
};

export default ActiveGame;
