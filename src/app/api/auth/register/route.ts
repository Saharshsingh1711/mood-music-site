import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please provide all required fields.' 
      }, { status: 400 });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ 
        success: false, 
        error: 'User already exists.' 
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'User registered successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
