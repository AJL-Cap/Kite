import React from "react";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";

const db = fire.database();
const ResponseMessage = props => {
  const [player, loading, error] = useObjectVal(
    db.ref(`players/${props.message.UID}`)
  );
  if (loading) return "";
  if (error) return "ERROR";
  return (
    <div className="row msg_container base_sent">
      <div className="col-md-10 col-xs-10">
        <div className="messages msg_sent">
          <p>{props.message.content}</p>
          <time>{player.nickname}</time>
        </div>
      </div>
      <div className="col-md-2 col-xs-2 avatar">
        <img src={player.profilePic.secure_url} className=" img-responsive " />
      </div>
    </div>
  );
};

export default ResponseMessage;
