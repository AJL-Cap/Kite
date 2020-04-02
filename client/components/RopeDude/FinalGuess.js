import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FinalGuess = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    console.log("final guess submitted");
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
