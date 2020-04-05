import React, { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";

const PointsTally = props => {
  const { session, uid, code } = props;
  // const [session, loading, error] = useObjectVal(db.ref(`gameSessions/${code}`))

  // if (loading) return "";
  // if (error) return "Error";

  // useEffect(() => {
  //   const players = session.players

  //   for (uid in players) {
  //     const {nickname, points} = players[uid]
  //   }

  //   console.log(players)
  // }, [session])

  return <div>Hello from Points Tally</div>;
};
export default PointsTally;
