const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")

// Database connection
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error mongodb: "))
db.once("open", function () {
  console.log(`
	--------------------------------
	MongoDb connection status [OK]')
	--------------------------------
			`)
})

app.use(express.json())

// Routes
app.use("/", require("./routes"))
app.use("/companies", require("./routes/companies"))


// 404 catch all handler
app.use((req, res, next) => {
  res.status(404).send("404 not Found!")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
