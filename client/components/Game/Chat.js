import React, { useEffect, useRef } from "react";
import fire from "../../fire";
import ResponseMessage from "./responseMessage";
import SentMessage from "./SentMessage";
import ChatForm from "./ChatForm";
import UIfx from "uifx";
import sound from "../../audio/cheerful.wav";

const db = fire.database();

const Chat = (props) => {
  const chat = new UIfx(sound, {
    volume: 0.03, // value must be between 0.0 ⇔ 1.0
    throttleMs: 50,
  });

  let { messages, userId, code } = props;
  const myRef = useRef(null);

  const scrollToBottom = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    db.ref(`lobbyMessages/${code}`).on("child_added", (newMessage) =>
      chat.play()
    );
  }, []);

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
