import React, { useEffect, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import NHIEForm from "./NHIEForm";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import NotFound from "../NotFound";
import ResponseDisplay from "./ResponseDisplay";
import axios from "axios";

const db = fire.database();

export default function PostResponse(props) {
  console.log(props);
  const { uid, code, players, session } = props.state;
  const [round, setRound] = useState(false);

  let resObj = {};
  useEffect(
    () => {
      db
        .ref("gameSessions/" + code + "/players")
        .on("child_added", snapshot => {
          db.ref(`players/${snapshot.key}/nickname`).once("value", name => {
            snapshot.ref.child("response").on("value", res => {
              if (res.val()) {
                console.log(res.val());
                resObj[name.val()] = res.val();
              }
            });
            if (Object.keys(resObj).length === players.length) {
              axios.post(`/api/games/${code}`, { status: "round" });
              setRound(true);
            }
          });
        });
    },
    [session]
  );

  console.log("round", round);
  return (
    <div>
      {round && (
        <div>
          <div>
            <ResponseDisplay resObj={resObj} />
          </div>
          <div className="row" id="playerDisplayPoints">
            {players.map(key => {
              return (
                <PlayerInfo
                  points={session.players[key].points}
                  key={key}
                  id={key}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
