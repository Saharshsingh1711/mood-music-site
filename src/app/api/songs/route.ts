import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Song from '@/models/Song';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get('mood');
    const trending = searchParams.get('trending') === 'true';
    const library = searchParams.get('library') === 'true';
    
    let songs;
    
    if (library) {
      const { cookies } = await import('next/headers');
      const jwt = (await import('jsonwebtoken')).default;
      const cookieStore = await cookies();
      const token = cookieStore.get('mms_token')?.value;
      
      if (!token) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
      
      const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this-in-env';
      const decoded: any = jwt.verify(token, JWT_SECRET);
      
      const User = (await import('@/models/User')).default;
      const user = await User.findById(decoded.id).populate('favorites');
      songs = user.favorites;
    } else {
      const query = mood ? { mood } : {};
      const sort = trending ? { playCount: -1 } : { createdAt: -1 };
      songs = await Song.find(query).sort(sort as any);
    }

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
