const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      trim: true,
    },
    role: {
      type: Number,
      default: 0, //0 is user, 1 is admin
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/do82dg0be/image/upload/v1610818176/avatar/avatar_othues_kg7b9g.jpg',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
