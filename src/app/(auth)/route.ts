// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    if (action === 'signin') {
      // In a real app, validate against a database
      if (email === 'demo@omoney.com' && password === 'Demo@1234') {
        return NextResponse.json({
          success: true,
          message: 'Sign in successful',
          user: {
            id: 'usr_001',
            firstName: 'Oluwaseun',
            lastName: 'Adeyemi',
            email: 'demo@omoney.com',
          },
        });
      }
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}