const express = require('express')
const router = express.Router()
const authsController = require("../controllers/auths.js")
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});



// Login authenticate local controllerda yapılıyor
router
    .post('/login', authsController.login, limiter )
    .get('/validate', authsController.validate, limiter)

module.exports = router
