const wordBank = [
  "policeman",
  "direction",
  "hilarious",
  "dangerous",
  "brainstorm",
  "repetition",
  "radiation",
  "cucumber",
  "monstrous",
  "football",
  "birthday",
  "handicap",
  "basketball",
  "appetite",
  "colorful",
  "wardrobe",
  "portrait",
  "marathon",
  "password",
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
  "parachute",
  "disappear",
  "qualified",
  "chemistry",
  "chocolate",
  "executive",
  "horoscope",
  "detective",
  "landscape",
  "knowledge",
  "reasonable",
  "attractive",
  "population",
  "pedestrian",
  "clearance",
  "regulation",
  "exaggerate",
  "motorcycle",
  "waterfall",
  "restaurant",
  "challenge"
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

export const timeSince = time => {
  var seconds = Math.floor((new Date() - time) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
};
