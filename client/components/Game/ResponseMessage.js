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
    <div className="row msg_container base_receive">
      {/* <div className="avatar float-right">
        {player.profilePic && <img src={player.profilePic.secure_url} />}
      </div> */}
      <div className="col-md col-xs">
        <div className="messages msg_receive">
          <p className="chat-time float-left">{player.nickname}</p>
          <p className="float-right">{props.message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ResponseMessage;
