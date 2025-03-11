const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companies')

const passport = require('passport')
const passportJWT = passport.authenticate('jwt', { session: false })


router
  .get('/',passportJWT, companyController.index)
  .post('/',passportJWT, companyController.create)

module.exports = router
