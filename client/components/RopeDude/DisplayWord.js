import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { useObjectVal } from "react-firebase-hooks/database";
import { displayIt } from "./util";

const db = fire.database();

const DisplayWord = props => {
  const { code, session } = props;
  const [display, setDisplay] = useState("");

  useEffect(
    () => {
      let letterBankArr = [];
      if (session.letterBank) {
        letterBankArr = Object.keys(session.letterBank);
      }
      const targetWord = session.targetWord;
      const displayed = displayIt(letterBankArr, targetWord);
      setDisplay(displayed);
    },
    [session.letterBank]
  );

  return (
    <div className="text-center">
      <h2>{display}</h2>
    </div>
  );
};

export default DisplayWord;
