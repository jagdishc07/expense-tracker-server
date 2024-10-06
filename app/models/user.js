import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    unique: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  g_id: {
    type: Number,
    required: false,
  },
  g_access_token: {
    type: String,
    required: false,
  },
  g_refresh_token: {
    type: String,
    required: false,
  },
})

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it's new or modified
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    return false
  }
}

const User = mongoose.model('User', userSchema)

export default User
