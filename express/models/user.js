
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  email_verified: Boolean,
  phone: String,
  password: String,
  isAdmin: Boolean,
  displayName: String
})
userSchema.set("timestamps", true)


userSchema.pre('save', async function (next) {
  // Burda biryerde kaydetmeden once sıkıntı var
  try {
    console.log('entered user schema pre save')

    const user = this
    //check if the user modified to know if password already hashed
    if (!user.isModified('password')) {
      next()
    }
    // Generate a Salt
    const salt = await bcrypt.genSaltSync(10)
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hashSync(this.password, salt)
    // Assign hash version to orijinal pass to store in db
    this.password = passwordHash
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    //Return compare of passes True or False
    return await bcrypt.compareSync(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model("User", userSchema)

module.exports = User
