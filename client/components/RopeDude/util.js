const wordBank = [
  "poison",
  "refuse",
  "tiptoe",
  "prison",
  "facade",
  "appeal",
  "coffin",
  "behead",
  "insert",
  "reverse",
  "trolley",
  "science",
  "abridge",
  "garbage",
  "undress",
  "storage",
  "officer",
  "hostage",
  "laborer",
  "industry",
  "daughter",
  "civilian",
  "offender",
  "function",
  "necklace",
  "occasion",
  "recovery",
  "sandwich",
  "mountain",
  "authorise",
  "disappear",
  "qualified",
  "apparatus",
  "chocolate",
  "executive",
  "horoscope",
  "detective",
  "landscape",
  "disappoint",
  "reasonable",
  "attractive",
  "population",
  "pedestrian",
  "competence",
  "regulation",
  "exaggerate",
  "motorcycle",
  "permission",
  "restaurant",
  "attractive"
];

export const generateTargetWord = () => {
  const targetWord = wordBank[Math.floor(Math.random() * wordBank.length - 1)];
  return targetWord.toUpperCase();
};

export const generateWordObj = word => {
  let wordObj = {};
  word
    .toUpperCase()
    .split("")
    .forEach((letter, idx) => {
      if (wordObj[letter]) {
        wordObj[letter].push(idx);
      } else {
        wordObj[letter] = [idx];
      }
    });
  return wordObj;
};
/* Example:
generateWordObj("cheese") =>
 { C: [ 0 ],
   H: [ 1 ],
   E: [ 2, 3, 5 ],
   S: [ 4 ] }
*/

export const displayIt = (letterBankArr, target) => {
  const wordObj = generateWordObj(target);
  let displayed = "#".repeat(target.length);

  letterBankArr.forEach(letter => {
    if (wordObj[letter.toUpperCase()]) {
      const indices = wordObj[letter.toUpperCase()];
      indices.forEach(idx => {
        displayed =
          displayed.substring(0, idx) + letter + displayed.substring(idx + 1);
      });
    }
  });
  return displayed;
};
/* Example:
  displayIt(["E"], cheese)) => "##EE#E"
*/

export const remainingLetters = letterBankArr => {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  letterBankArr.forEach(guessed => {
    alphabet = alphabet
      .split("")
      .filter(letter => letter !== guessed)
      .join("");
  });
  return alphabet;
};
/* Example:
  remainingLetters(["C", "E"]) => "ABDFGHIJKLMNOPQRSTUVWXYZ"
*/
