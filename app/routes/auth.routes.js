import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    theme: 'dark',
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/login/failed',
  }),
  (req, res) => {
    console.log(req.user)
    res.json({ token: req.user.token })
  }
)

export default router
