import React, { useEffect, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import NHIEForm from "./NHIEForm";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import ResponseDisplay from "./ResponseDisplay";
import axios from "axios";
import { useLocation } from "react-router-dom";

const db = fire.database();

const NHIE = props => {
  const { code } = props;
  const [session, loading, error] = useObjectVal(
    db.ref("gameSessions/" + code)
  );

  if (loading) return "";
  if (error) return "Error";
  if (!session) return <NotFound />;

  let players = Object.keys(session.players);
  let responses = [];

  return (
    <div>
      <h1>Hello World from NHIE</h1>
      {session.status === "responding" && (
        <NHIEForm userId={props.userId} code={code} />
      )}
    </div>
  );
};

export default NHIE;
