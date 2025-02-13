const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

require('dotenv').config()

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error mongodb: '))
db.once('open', function () {
    console.log(`
	--------------------------------
	MongoDb connection status [OK]')
	--------------------------------
			`)
})

// Middlewares
// cors middleware allow cross-origin requests
var allowedDomains = process.env.CORS_LIST
app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));




app.use(express.json())

// Routes
app.use('/', require('./routes'))
app.use('/companies', require('./routes/companies'))

// 404 catch all handler
app.use((req, res, next) => {
    res.status(404).send('404 not Found!')
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})
