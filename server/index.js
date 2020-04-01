const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const PORT = process.env.PORT || 8080;
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("../admin.json");
const { databaseURL } = require("../secrets");

module.exports = app;

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== "production") require("../secrets");

const createApp = () => {
  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  app.use("/api", require("./api"));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, "..", "public")));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

//start of game controller
const db = admin.database();
function endRound(ref, updateRef, status) {
  if (ref) {
    ref.off();
  }
  db.ref(updateRef).set(status);
}
function endGame(deleteRef) {
  db.ref(deleteRef).remove();
}

//getting each game session information;
db.ref("gameSessions").on("child_added", snapshot => {
  //getting the status for each session
  // swtich on snapshot.val().gameID
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
          if (playersSnap.val()) {
            const players = Object.values(playersSnap.val()); //still getting the weird error here
            players.forEach(player => {
              if (parseInt(player.points) <= 0) isGameOver = true;
            });
          } else {
            console.log(
              "if playersSnap.val() isn't an object what is it??? ",
              playersSnap.val()
            );
          }
          // if (isGameOver) {
          //   clearTimeout(roundTimeout);
          //   endRound(ref, refToChange, "finished");
          // }
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
});

//end of game controller

async function bootApp() {
  await createApp();
  await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
