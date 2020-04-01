const nhie = () => {
  snapshot.ref.child("status").on("value", statusSnapshot => {
    const status = statusSnapshot.val();
    if (status === "responding") {
      db.ref(`gameSessions/${snapshot.key}/rounds`).push({
        timeStarted: Date.now()
      });
      console.log("in responding");
      //getting total # of players
      let totalPlayers;
      snapshot.ref
        .child("players")
        .once("value")
        .then(playerSnapshot => {
          totalPlayers = playerSnapshot.numChildren();
        });
      //getting the rounds object limited to the last round
      snapshot.ref.child("rounds").on("child_added", roundSnapshot => {
        const rounds = roundSnapshot.val();
        //getting list of rounds values
        if (rounds) {
          const responsesRef = roundSnapshot.ref.child("responses");
          //function to end the round and change the status to confessing.
          //getting the responses
          let responses;
          let refToChange = "gameSessions/" + snapshot.key + "/status";
          //timeout function
          const roundTimeout = setTimeout(function() {
            //if at the end of the round there are responses
            if (responses) {
              snapshot.ref.child("rounds").off();
              //updating timeStarted for the front end timer
              roundSnapshot.ref.update({
                timeStarted: Date.now()
              });
              //updating to confessing
              endRound(responsesRef, refToChange, "confessing");
              //if no responses
            } else {
              responsesRef.off();
              snapshot.ref.child("rounds").off();
              //deleting that game session
              let refToDelete = "gameSessions/" + snapshot.key;
              endGame(refToDelete);
            }
          }, 30000);
          //getting responses
          responsesRef.on("value", roundResponsesSnapshot => {
            responses = roundResponsesSnapshot.val();
            //checking for submitted responses
            if (responses) {
              let resArr = [];
              Object.values(responses).forEach(resObj => {
                if (resObj.text.length > 1) {
                  resArr.push(resObj.text);
                }
              });
              // if we have responses for every player in the game session:
              if (resArr.length === totalPlayers) {
                snapshot.ref.child("rounds").off();
                clearTimeout(roundTimeout);
                //updating timeStarted for the front end timer
                roundSnapshot.ref.update({
                  timeStarted: Date.now()
                });
                endRound(responsesRef, refToChange, "confessing");
              }
            }
          });
        }
      });
    } else if (status === "confessing") {
      console.log("in confessing");
      // console.log("HELLOOOOO", snapshot.val().players);
      let refToChange = "gameSessions/" + snapshot.key + "/status";
      // console.log("refToChange:", refToChange);
      let isGameOver = false;
      let ref = snapshot.ref.child("players");
      //checking gameover when confessing time is up
      const roundTimeout = setTimeout(function() {
        if (isGameOver) {
          // console.log("isGameOver", Boolean(isGameOver));
          //changing status to finished if game is over
          endRound(ref, refToChange, "finished");
        } else {
          //chaging status to responding if game is still on
          endRound(ref, refToChange, "responding");
        }
      }, 30000);
      //checking if any player's point is 0
      snapshot.ref
        .child("players")
        .orderByChild("points")
        .on("value", playersSnap => {
          if (typeof playersSnap.val() === "object") {
            const players = Object.values(playersSnap.val());
            players.forEach(player => {
              if (parseInt(player.points) <= 0) isGameOver = true;
            });
          } else {
            console.log(
              "if playersSnap.val() isn't an object what is it??? ",
              playersSnap.val()
            );
          }
        });
      //ending the game right away if at least one player reaches 0 points
    } else if (status === "finished") {
      console.log("in finished");
      let refToDelete = "gameSessions/" + snapshot.key;
      //ending finished in specified time and deleted the game session
      const roundTimeout = setTimeout(function() {
        endGame(refToDelete);
      }, 20000);
    }
  });
};

module.exports = nhie;
