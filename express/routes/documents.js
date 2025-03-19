
const express = require('express')
const router = express.Router()
const documentsController = require('../controllers/documents')

const passport = require('passport')
const passportJWT = passport.authenticate('jwt', { session: false })


router
  .get('/',passportJWT, documentsController.index)
  .post('/',passportJWT, documentsController.create)

module.exports = router
