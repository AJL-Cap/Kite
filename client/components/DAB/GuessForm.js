import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import fire from "../../fire";
import HandleResponse from "./HandleResponse";
import DisplayResults from "./DisplayResults";

const db = fire.database();

const GuessForm = props => {
  const { drawerId, code, uid, session } = props;
  const { register, handleSubmit, errors } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const { targetWord } = session.players[drawerId];

  useEffect(
    () => {
      if (drawerId && drawerId == uid) {
        setViewAnswers(true);
      } else {
        setViewAnswers(false);
      }
    },
    [drawerId]
  );

  const onSubmit = data => {
    const { guess1, guess2, guess3 } = data;
    db.ref(`gameSessions/${code}/players/${uid}/responses`).update({
      1: guess1.toUpperCase(),
      2: guess2.toUpperCase(),
      3: guess3.toUpperCase()
    });
    setSubmitted(true);
    setViewAnswers(true);
  };
  if (viewAnswers && drawerId) {
    return (
      <div>
        {submitted && <HandleResponse {...props} />}
        <DisplayResults
          code={code}
          drawerId={drawerId}
          targetWord={targetWord}
        />}
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card text-center">
          <div className="card-header">
            <strong>
              Hot off the easel! It's time for you to guess what it is.
            </strong>
          </div>
          <div className="card-body">
            <h5 className="card-title">Submit up to 3 guesses</h5>
            <div className="card-text">
              <input
                type="text"
                name="guess1"
                ref={register({ required: true })}
              />
              <input type="text" name="guess2" ref={register()} />
              <input type="text" name="guess3" ref={register()} />
              {errors.guess1 && <p>You must enter at least 1 guess!</p>}
              <input type="submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuessForm;
