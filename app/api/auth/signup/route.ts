import { NextRequest, NextResponse } from 'next/server';

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  experienceLevel?: string;
  primaryLanguage?: string;
  learningGoals?: string[];
}

// Mock database to simulate email conflicts
const mockUsers = new Set(['test@example.com', 'admin@example.com']);

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();
    const { name, email, password, experienceLevel, primaryLanguage, learningGoals } = body;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (mockUsers.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'EMAIL_IN_USE' },
        { status: 409 }
      );
    }

    // Simulate random server errors occasionally
    if (Math.random() < 0.1) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    // Add user to mock database
    mockUsers.add(email.toLowerCase());

    // In a real implementation, you would:
    // 1. Hash the password with bcrypt
    // 2. Save user to database
    // 3. Create session/JWT token
    // 4. Set secure httpOnly cookie

    console.log('New user registered:', { 
      name, 
      email, 
      experienceLevel, 
      primaryLanguage, 
      learningGoals 
    });

    return NextResponse.json(
      { 
        success: true, 
        userId: `user_${Date.now()}`,
        message: 'Account created successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}