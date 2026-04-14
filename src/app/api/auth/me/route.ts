import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this-in-env';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mms_token')?.value;

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Not authenticated.' 
      }, { status: 401 });
    }

    // Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    await dbConnect();
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found.' 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid session.' 
    }, { status: 401 });
  }
}
