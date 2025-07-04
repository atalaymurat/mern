
const express = require('express')
const router = express.Router()
const documentsController = require('../controllers/documents')

const passport = require('passport')
const passportJWT = passport.authenticate('jwt', { session: false })


router
  .get('/',passportJWT, documentsController.index)
  .get('/:id',passportJWT, documentsController.show)
  .post('/',passportJWT, documentsController.create)
  .patch('/:id',passportJWT, documentsController.update)
  .delete('/:id',passportJWT, documentsController.destroy)

module.exports = router
