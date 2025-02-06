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
var corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

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
