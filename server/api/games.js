const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.database();

//updating game status
router.post("/:code", async (req, res, next) => {
  const { code } = req.params;
  const { status } = req.body;
  try {
    await db.ref(`gameSessions/${code}`).update({ status });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

//updating response for given user
router.post("/:code/response", async (req, res, next) => {
  const { code } = req.params;
  const { uid, response } = req.body;
  try {
    await db.ref(`gameSessions/${code}/players/${uid}`).update({ response });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

//checking if every player has submitted response
router.get("/:code/response", async (req, res, next) => {
  const { code } = req.params;
  try {
    let arr = [];
    await db
      .ref(`gameSessions/${code}/players`)
      .once("value")
      .then(snapshot => {
        for (const uid in snapshot.val()) {
          arr.push(snapshot.val()[uid].responding);
        }
      });
    //if everyone has responded...
    if (arr.every(el => el === false)) {
      res.send({ ready: true });
      console.log("everyone has responded");
    } else {
      res.send({ ready: false });
      console.log("not yet");
    }
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
