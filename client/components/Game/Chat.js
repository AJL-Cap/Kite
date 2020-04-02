import React, { useEffect, useRef } from "react";
import fire from "../../fire";
import ResponseMessage from "./responseMessage";
import SentMessage from "./SentMessage";
import ChatForm from "./ChatForm";

const Chat = props => {
  let { messages } = props;
  const myRef = useRef(null);
  const scrollToBottom = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat">
      <div className="chat-area">
        <div>
          {messages.map((message, indx) => {
            if (message.UID === props.userId) {
              return (
                <div className="chat-bubble user" key={indx}>
                  <SentMessage message={message} />
                </div>
              );
            } else {
              return (
                <div className="chat-bubble " key={indx}>
                  <ResponseMessage message={message} />
                </div>
              );
            }
          })}
          <div ref={myRef} className="mb-20" />
        </div>
      </div>
      <div>
        <ChatForm code={props.code} userId={props.userId} />
      </div>
    </div>
  );
};

export default Chat;
