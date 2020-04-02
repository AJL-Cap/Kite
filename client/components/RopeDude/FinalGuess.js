import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fire from "../../fire";

const db = fire.database();

const FinalGuess = props => {
  const { session, code } = props;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const guess = data.wordGuess.toUpperCase();
    console.log("final guess submitted: ", guess);
    if (guess !== session.targetWord) {
      db.ref(`gameSessions/${code}/points`).set(0);
    }
    db.ref(`gameSessions/${code}/status`).set("finished");
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
        {errors.wordGuess && (
          <span className="alert-warning">code must be 4 letters long</span>
        )}
        <Button variant="danger" type="submit">
          Submit Final Guess
        </Button>
      </form>
    </div>
  );
};

export default FinalGuess;
