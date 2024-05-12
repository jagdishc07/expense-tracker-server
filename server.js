import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './app/config/database/db.js'
import routesList from 'express-list-routes'
dotenv.config()

const app = express()

const corsOptions = {
  origin: process.env.ORIGIN,
  methods: ['POST', 'PUT', 'GET', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to MongoDB

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to XpenseSync server!',
  })
})
routesList(app)

const PORT = process.env.PORT

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
