const mongoose = require("mongoose")
const Schema = mongoose.Schema

const documentSchema = new Schema({
  customer: String,
  person: String,
  address: String,
})

documentSchema.set("timestamps", true)
const Document = mongoose.model("Document", documentSchema)

module.exports = Document