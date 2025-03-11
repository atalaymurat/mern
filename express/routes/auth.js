const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConf = require("../passport.js")
const authsController = require("../controllers/auths.js")


const passportJWT = passport.authenticate('jwt', { session: false })
// Login authenticate local controllerda yapılıyor
router
    .post('/login', authsController.login )

module.exports = router
