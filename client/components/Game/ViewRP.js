import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import RecentPlayers from "../User/RecentPlayers";

const db = fire.database();

export default function ViewRP(props) {
  const { uid } = props;
  const [player, loading, err] = useObjectVal(db.ref(`players/${uid}`));

  if (loading) {
    return "";
  }
  if (err) {
    return <div>error!</div>;
  }
  if (player) {
    return (
      <div className="col mb-4 align-self-center">
        {player.recentPlayers ? (
          <div className="column m-5">
            <RecentPlayers recents={player.recentPlayers} invite={true} />
          </div>
        ) : (
          <div>There aren't any recent players</div>
        )}
      </div>
    );
  }
}
