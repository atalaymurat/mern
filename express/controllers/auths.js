const passport = require('passport')
const JWT = require('jsonwebtoken')

signToken = (user) => {
  return JWT.sign(
    {
      iss: 'apiSalesman',
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET
  )
}


module.exports = {

    login: async (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
      console.log("USER LOGIN START")
      if (err) {
        return next(err)
      }
      if (!user) {
        console.log('LOCAL STRETEGY RESPOND NO USER')
        return res.status(401).json({
          status: 'error',
          error: info.message,
          message: 'Kayıt bulunamadı Üye olamayı deneyin',
        })
      }

      const token = signToken(user)
      res.cookie('access_token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
        sameSite: 'none', // Allow cross-site cookies
      })

      res.status(200).json({
        status: "success",
        message: "Giriş Başarılı",
        user: {
          id: user._id,
          email: user.email,
        }
      })
    })(req, res, next)
  }

}