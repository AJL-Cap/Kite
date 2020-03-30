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

module.exports = router;
