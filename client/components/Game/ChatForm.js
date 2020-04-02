import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import fire from "../../fire";
const db = fire.database();

const ChatForm = props => {
  const methods = useForm();
  let { handleSubmit, control, reset } = methods;
  //   const [message, setMessage] = useState("");
  const onSubmit = data => {
    db.ref(`lobbyMessages/${props.code}/messages`).push({
      UID: props.userId,
      content: data.message
    });
    reset({ message: "" });
  };
  return (
    <div className="panel-footer">
      <div className="input-group">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={<input className="messageForm" />}
            name="message"
            control={control}
            defaultValue=""
            placeholder="Write a message..."
            rules={{ required: true }}
          />
          <span className="input-group-btn">
            <button
              type="submit"
              className="btn alert-light btn-sm"
              id="btn-chat"
            >
              Send Message
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
