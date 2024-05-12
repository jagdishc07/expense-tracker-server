import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './app/config/database/db.js'
import routesList from 'express-list-routes'
dotenv.config()

const app = express()

const corsOptions = {
  origin: process.env.DEV_ORIGIN,
  methods: ['POST', 'PUT', 'GET', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to MongoDB
connectDB()

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MySellerCentral AmazonAds Services',
  })
})
routesList(app)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
