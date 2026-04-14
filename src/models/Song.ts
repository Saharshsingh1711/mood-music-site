import mongoose, { Schema, model, models } from 'mongoose';
import { Mood } from '@/types';

const SongSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this song.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  artist: {
    type: String,
    required: [true, 'Please provide an artist name.'],
    maxlength: [100, 'Artist cannot be more than 100 characters'],
  },
  mood: {
    type: String,
    required: [true, 'Please provide a mood.'],
    enum: ['Chill', 'Energetic', 'Focus', 'Melancholic', 'Intense'],
  },
  audioUrl: {
    type: String,
    required: [true, 'Please provide an audio URL.'],
  },
  coverUrl: {
    type: String,
    required: [true, 'Please provide a cover image URL.'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide a duration in seconds.'],
  },
}, {
  timestamps: true,
});

// Prevent model overwrite during development hot-reloading
export default models.Song || model('Song', SongSchema);
