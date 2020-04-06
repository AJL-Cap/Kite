import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fire from "../../fire";

const db = fire.database();

const FinalGuess = props => {
  const { session, code, uid, nick } = props;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const guess = data.wordGuess.toUpperCase();
    if (guess !== session.targetWord) {
      db.ref(`gameSessions/${code}/points`).set(0);
    }
    db.ref(`gameSessions/${code}`).update({
      finalGuess: { [nick]: guess }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="wordGuess"
          placeholder="Are you sure?..."
          ref={register({ required: true })}
        />
        <Button className="alert-danger" type="submit">
          Submit Final Guess
        </Button>
      </form>
    </div>
  );
};

export default FinalGuess;
