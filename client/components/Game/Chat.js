import React, { useEffect } from "react";
import fire from "../../fire";
import { useListVals } from "react-firebase-hooks/database";
import ResponseMessage from "./responseMessage";
import SentMessage from "./SentMessage";
import ChatForm from "./ChatForm";
import Scroll from "react-scroll";

var scroll = Scroll.animateScroll;

const db = fire.database();
const Chat = props => {
  const [messages, loading, error] = useListVals(
    db.ref(`lobbyMessages/${props.code}/messages`)
  );

  let scrollToBottom = () => {
    scroll.scrollToBottom({
      containerId: "bottom"
    });
  };
  useEffect(scrollToBottom, [messages]);
  if (loading) return "";
  if (error) return "ERROR";

  return (
    <div className="container">
      <div className="col-sm-8">
        <div className="chatbody">
          <div className="panel panel-primary">
            <div className="panel-heading top-bar">
              <div className="col-md-8 col-xs-8">
                <h3 className="panel-title">
                  <span className="glyphicon glyphicon-comment" /> Chat
                </h3>
              </div>
            </div>
            <div className="panel-body msg_container_base">
              {messages.map((message, indx) => {
                if (message.UID === props.userId) {
                  return <ResponseMessage message={message} key={indx} />;
                } else {
                  return <SentMessage message={message} key={indx} />;
                }
              })}
              <div id="bottom" />
            </div>
            <ChatForm code={props.code} userId={props.userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
