const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConf = require("../passport.js")
const authsController = require("../controllers/auths.js")


// Login authenticate local controllerda yapılıyor
router
    .post('/login', authsController.login )
    .get('/validate', authsController.validate)

module.exports = router
