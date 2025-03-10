
const User = require("../models/user")

module.exports = {
  index: async (req, res, next) => {
    try {
        const Users = await User.find()
        res.status(200).json({success: true, message: "User Index", doc: Users})
    } catch (err) {
      console.log(err)
    }
  },
  
  create: async (req, res, next) => {
    try {

      const data = req.body
      const user = new User(data)
      await user.save()
      console.log("CNTRL CREATE USER", user)

      res.status(200).json({ success: true, doc: user })
    } catch (err) {

      console.log("CNTRL CREATE USER", err)
    }
  },
}