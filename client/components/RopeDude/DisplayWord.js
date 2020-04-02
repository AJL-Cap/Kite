import React, { useEffect, useState } from "react";
import fire from "../../fire";
//import { useObjectVal } from "react-firebase-hooks/database";
import { displayIt } from "./util";
import styled from "styled-components";

//const db = fire.database();

const DisplayWord = props => {
  const { code, session } = props;
  const [display, setDisplay] = useState([]);

  useEffect(
    () => {
      let letterBankArr = [];
      if (session.letterBank) {
        letterBankArr = Object.keys(session.letterBank);
      }
      const targetWord = session.targetWord;
      const displayed = displayIt(letterBankArr, targetWord);
      setDisplay(displayed.split(""));
    },
    [session.letterBank]
  );

  return (
    <div className="container">
      <div className="row">
        {display.map((char, idx) => (
          <Letter key={idx}>
            <div className="alert alert-info col border border-dark">
              {char}
            </div>
          </Letter>
        ))}
      </div>
    </div>
  );
};

export default DisplayWord;

const Letter = styled.div`
  width: 60px;
  height: 60px;
  padding: 2px;
`;
