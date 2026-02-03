const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");

const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });

router.get("/", passportJWT, searchController.documents);

module.exports = router;
