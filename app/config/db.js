import mongoose from 'mongoose'
class ConnectDB {
  static mongoDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI)
      console.log(`Successfully connnected to mongoDB 👍`)
    } catch (error) {
      console.error(`ERROR: ${error.message}`)
      process.exit(1)
    }
  }
}

export default ConnectDB
