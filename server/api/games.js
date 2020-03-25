const router = require('express').Router()
const admin = require('firebase-admin')
const db = admin.database()

router.post('/:code', async (req, res, next) => {
  const code = req.params.code
  const {uid, response, responding} = req.body
  try {
    await db
      .ref(`gameSessions/${code}/players/${uid}`)
      .update({response, responding})
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
