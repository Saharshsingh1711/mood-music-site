import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully.'
  });

  // Clear cookie
  const cookie = serialize('mms_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  response.headers.set('Set-Cookie', cookie);

  return response;
}
