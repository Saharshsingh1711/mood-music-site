import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Song from '@/models/Song';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get('mood');
    
    const query = mood ? { mood } : {};
    const songs = await Song.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      count: songs.length,
      songs 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
