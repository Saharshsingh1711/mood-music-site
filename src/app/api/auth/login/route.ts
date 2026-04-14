import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this-in-env';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please provide email and password.' 
      }, { status: 400 });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials.' 
      }, { status: 401 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials.' 
      }, { status: 401 });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create cookie
    const cookie = serialize('mms_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites
      }
    });

    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
