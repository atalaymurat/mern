const passport = require('passport')
const LocalStragety = require('passport-local').Strategy
const User = require('./models/user.js')



//Local Strategy
passport.use(
  'local',
  new LocalStragety(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // find user
        const user = await User.findOne({ 'email': email })
        // if there is no user record
        if (!user) {
          console.log('[PASS-LCL] Email no record No User! : ', email)
          return done(null, false, { message: "Kullanıcı kaydı bulunamadı", error: "Email kayıtlı değil" })
        }
        // Check if pass correct
        const isMatch = await user.isValidPassword(password)
        if (!isMatch) {
          console.log('[PASS-LCL] Password is no match')
          return done(null, false, { message: "Email ve şifre eşleşmiyor" })
        }
        console.log('[PASS-LCL] Password and Email match OK!')
        // Password and User  ok then go

        //Checking is email_verified true
        if (!user.email_verified) {
          console.log('[PASS-LCL] Email is not verified')
          return done(null, user, { message : "Email doğrulanmamış" })
        }
        console.log('[PASS-LCL] Email is verified OK!')
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)