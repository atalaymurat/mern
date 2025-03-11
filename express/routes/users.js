const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const passport = require('passport')

const passportJWT = passport.authenticate('jwt', { session: false })

router
  .get('/',passportJWT, userController.index)
  .post('/',passportJWT, userController.create)
  

module.exports = router
