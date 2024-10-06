import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import routesList from 'express-list-routes'
import ConnectDB from './app/config/db.js'
import './app/config/passport.js'
import auth from './app/routes/auth.routes.js'
dotenv.config()

// Application Instance
const app = express()

// Application Middlewares
const corsOptions = {
  origin: process.env.ORIGIN,
  methods: ['POST', 'PUT', 'GET', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Application Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to XpenseSync server!',
  })
})
app.use('/auth', auth)
routesList(app)

// Application Port
const PORT = process.env.PORT || 3000

// Connecting to DB and Initializing server
ConnectDB.mongoDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.on('exit', (code) => {
      console.log(`Server exited with code ${code}`)
    })
  })
