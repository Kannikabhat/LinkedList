import { NextRequest, NextResponse } from 'next/server';

interface LoginRequest {
  email: string;
  password: string;
}

// Mock user credentials (in production, compare with hashed passwords from database)
const mockCredentials = {
  'test@example.com': 'password123',
  'admin@example.com': 'admin123',
  'user@demo.com': 'Demo123!',
};

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      );
    }

    // Check credentials
    const storedPassword = mockCredentials[email.toLowerCase() as keyof typeof mockCredentials];
    if (!storedPassword || storedPassword !== password) {
      return NextResponse.json(
        { error: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    // Simulate random server errors occasionally
    if (Math.random() < 0.05) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    // In a real implementation, you would:
    // 1. Verify password with bcrypt
    // 2. Create JWT token or session
    // 3. Set secure httpOnly cookie
    // 4. Return user data

    console.log('User logged in:', email);

    return NextResponse.json(
      { 
        success: true,
        token: `jwt_${Date.now()}`,
        user: {
          email,
          name: 'Demo User'
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}