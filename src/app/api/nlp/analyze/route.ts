import { NextResponse } from 'next/server';
import { detectVibe } from '@/lib/nlp';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'Please provide text for analysis.' 
      }, { status: 400 });
    }

    const analysis = detectVibe(text);

    return NextResponse.json({ 
      success: true, 
      analysis 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
