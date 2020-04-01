import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { useListKeys, useObjectVal } from "react-firebase-hooks/database";

const db = fire.database();

const LetterBank = props => {
  const { code, session } = props;
  const targetWord = session.targetWord;
  const [letterBank, loading, error] = useListKeys(
    db.ref(`gameSessions/${code}/letterBank`)
  );

  if (loading) return "";
  if (error) return <div>err</div>;

  const wrongGuesses = letterBank.filter(
    letter => !targetWord.includes(letter)
  );

  return <div>Wrong Guesses: {wrongGuesses}</div>;
};

export default LetterBank;
