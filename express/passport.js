const passport = require('passport')
const LocalStragety = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const User = require('./models/user.js')


// Set the cookie token
const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['access_token']
  }
  return token
}

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

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        // Find the user token specific
        console.log('[PASS-JWT] JWT try to Find User:')
        const user = await User.findById(payload.sub)
        // if user does not exist
        if (!user) {
        console.log('[PASS-JWT] JWT can not  Find a User:')
          return done(null, false)
        }

        // Otherwise return user
        req.user = user
        console.log('[PASS-JWT] JWT Find the User:')

        done(null, user)
      } catch (error) {
        console.log("Error Cathed JWT STG")
        done(error, false)
      }
    }
  )
)