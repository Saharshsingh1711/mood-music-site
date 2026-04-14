import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Song from '@/models/Song';
import { MOCK_SONGS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    // Remove existing data
    await Song.deleteMany({});

    // insert mock data
    // Map MOCK_SONGS to match Mongoose schema (if needed)
    const formattedSongs = MOCK_SONGS.map(song => ({
      title: song.title,
      artist: song.artist,
      mood: song.mood,
      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl,
      duration: song.duration
    }));

    await Song.insertMany(formattedSongs);

    return NextResponse.json({ 
      success: true, 
      message: `${formattedSongs.length} songs seeded successfully.`,
      tracks: formattedSongs
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
