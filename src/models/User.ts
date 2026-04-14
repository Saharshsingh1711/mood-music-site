import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't return password by default
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Song',
  }],
}, {
  timestamps: true,
});

export default models.User || model('User', UserSchema);
