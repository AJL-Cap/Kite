import React from "react";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";

const db = fire.database();
const SentMessage = props => {
  const [player, loading, error] = useObjectVal(
    db.ref(`players/${props.message.UID}`)
  );
  if (loading) return "";
  if (error) return "ERROR";
  return (
    <div className="row msg_container base_sent">
      <div className="col-md-10 col-xs-10">
        <div className="messages msg_sent">
          <p className="chat-time float-right">{player.nickname}</p>
          <p>{props.message.content}</p>
        </div>
      </div>
      {/* <div className="avatar float-right">
        {player.profilePic && <img src={player.profilePic.secure_url} />}
      </div> */}
    </div>
  );
};

export default SentMessage;
