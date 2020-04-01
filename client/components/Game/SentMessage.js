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
    <div className="row msg_container base_receive">
      <div className="col-md-2 col-xs-2 avatar">
        <img src={player.profilePic.secure_url} className=" img-responsive " />
        <time>{player.nickname}</time>
      </div>
      <div className="col-md-10 col-xs-10">
        <div className="messages msg_receive">
          <p>{props.message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SentMessage;
