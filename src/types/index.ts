export type Mood = 'Chill' | 'Energetic' | 'Focus' | 'Melancholic' | 'Intense';

export interface Song {
  id: string;
  title: string;
  artist: string;
  mood: Mood;
  audioUrl: string;
  coverUrl: string;
  duration: number; // in seconds
}

export interface UserProfile {
  id: string;
  name: string;
  favorites: string[]; // IDs of favorite songs
}
