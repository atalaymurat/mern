const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const cookieParser = require('cookie-parser')

require('dotenv').config()

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error mongodb: '))
db.once('open', function () {
    console.log(`
	--------------------------------
	MongoDb connection status [OK]')
  ${db.host}
	--------------------------------
			`)
})

// Middlewares
app.use(express.json())
app.use(cookieParser())

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





// Routes
app.use('/', require('./routes'))
app.use('/companies', require('./routes/companies'))
app.use('/user', require('./routes/users'))
app.use('/auth', require('./routes/auth'))

// Route Handlers
// 404 catch all handler
app.use((req, res, next) => {
    res.status(404).send('404 not Found!')
})
// 500 error handler (middleware)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
  res.send('500 internal server error')
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})
