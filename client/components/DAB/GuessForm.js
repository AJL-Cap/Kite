import React from "react";
import { useForm } from "react-hook-form";
import fire from "../../fire";

const db = fire.database();

const GuessForm = props => {
  const { drawer, session, code, uid, drawerID } = props;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log("guesses submitted:", data);
    const { guess1, guess2, guess3 } = data;
    db.ref(`gameSessions/${code}/players/${uid}/responses`).update({
      1: guess1,
      2: guess2,
      3: guess3
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card text-center">
          <div className="card-header">
            <strong>Guess what {drawer} drew...</strong>
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
