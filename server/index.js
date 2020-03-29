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
  snapshot.ref.child("status").on("value", statusSnapshot => {
    const status = statusSnapshot.val();
    if (status === "responding") {
      //getting the rounds object
      snapshot.ref.child("rounds").on("value", roundsSnapshot => {
        const rounds = roundsSnapshot.val();
        //getting list of rounds values
        if (rounds) {
          const roundsList = Object.values(rounds);
          //getting list of round keys
          const roundsKeys = Object.keys(rounds);
          //finding the last round values
          const round = roundsList[roundsList.length - 1];
          //finding the last round key
          const roundKey = roundsKeys[roundsList.length - 1];
          //getting the reference to responses in the last round
          const responsesRef = snapshot.ref
            .child("rounds")
            .child(roundKey)
            .child("responses");
          //function to end the round and change the status to confessing.
          //getting the responses
          responsesRef.on("value", roundResponsesSnapshot => {
            const responses = roundResponsesSnapshot.val();
            //end round function to be used with timeout and when all ppl have responded
            let refToChange = "gameSessions/" + snapshot.key + "/status";
            //timeout for a certain amount of time then changing status to confessing
            const roundTimeout = setTimeout(function() {
              endRound(responsesRef, refToChange, "confessing");
            }, 3000);
            let userIds;
            if (responses) {
              userIds = Object.keys(responses);
            }
            // if (/*we have responses for every player in the game session*/) {
            //   clearTimeout(roundTimeout);
            //   endRound()
            // }
          });
        }
      });
    } else if (status === "confessing") {
      let refToChange = "gameSessions/" + snapshot.key + "/status";
      console.log("in confessing");
      //ending confessing round in specified time and updating to finished
      const roundTimeout = setTimeout(function() {
        endRound(undefined, refToChange, "finished");
      }, 3000);
    } else if (status === "finished") {
      console.log("in finished");
      let refToDelete = "gameSessions/" + snapshot.key;
      //ending finished in specified time and deleted the game session
      const roundTimeout = setTimeout(function() {
        endGame(refToDelete);
      }, 10000);
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
