import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this-in-env';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mms_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Not authenticated.' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const { songId } = await request.json();

    if (!songId) {
      return NextResponse.json({ success: false, error: 'Song ID is required.' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    // Toggle favorite
    const index = user.favorites.indexOf(songId);
    if (index === -1) {
      user.favorites.push(songId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      favorites: user.favorites,
      message: index === -1 ? 'Added to favorites.' : 'Removed from favorites.'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
