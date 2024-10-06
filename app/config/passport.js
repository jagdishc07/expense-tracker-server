import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' // Import dotenv
import User from '../models/user.js'

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
          user = new User({
            g_id: profile.id,
            username: '',
            email: profile.emails[0].value,
            full_name: profile.displayName,
            g_access_token: accessToken,
            g_refresh_token: refreshToken,
          })
          await user.save()
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        })
        done(null, { user, token })
      } catch (err) {
        done(err, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})
