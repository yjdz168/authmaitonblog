import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically send an email or save to a database
    // For now, we'll just log it and return success
    console.log('Contact form submission:', body);
    
    // You can integrate with email services like SendGrid, Resend, etc.
    
    return NextResponse.json({
      success: true,
      message: 'Message received successfully'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
