import React, { useState, useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import NotFound from "../NotFound";

const db = fire.database();

const ResponseDisplay = props => {
  const { session, uid, resObj } = props;
  // const [turn, setTurn] = useState({})
  // const firstTurn = session[1].players[0] // just trying to get the first turn for now and refactor later
  // const firstID = Object.keys(firstTurn[0])
  // const [nickname, nicknameLoading, nicknameError] = useObjectVal(
  //   db.ref('players/' + firstID + '/nickname')
  // )

  // useEffect(() => {
  //   setTurn() // don't know how to handle turns yet, probably using fetch to do a cnc request in here somewhere?? i am so lost
  // },[])

  // if (nicknameLoading) return ''
  // if (nicknameError) return 'Error'
  // if (!nickname) return <NotFound />

  // setTurn({...firstTurn, nickname})

  // const subtract20 = () => {
  //   db
  //     .ref('gameSessions/' + session[0] + '/players/' + uid + '/points')
  //     .set(session[1].players[uid].points - 20)
  // }

  return (
    <div>
      helloworld from ResponseDisplay
      {/* <div className="jumbotron text-center">
        <h2>Never has {turn.nickname} ever...</h2>
        <h1>{turn.response}</h1>
      </div>
      <div>
        <button onClick={subtract20}>I have</button>
      </div> */}
    </div>
  );
};

export default ResponseDisplay;
