import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, message, senderName, replyTo } = body;

    // Validate inputs
    if (!subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: subject or message' },
        { status: 400 }
      );
    }

    // Ensure API keys and destination email are configured
    const recipientEmail = process.env.CONTACT_EMAIL;
    if (!process.env.RESEND_API_KEY || !recipientEmail) {
      console.error('RESEND_API_KEY or CONTACT_EMAIL is not configured in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const fromName = senderName ? `${senderName} (Portfolio)` : 'Portfolio Contact';
    
    // Resend requires a verified domain in the "from" field. 
    // Usually, you'd use something like "onboarding@resend.dev" for testing or your own domain.
    const fromAddress = 'onboarding@resend.dev'; 

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromAddress}>`,
      to: [recipientEmail],
      subject: subject,
      reply_to: replyTo,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Message from ${senderName || 'Anonymous'}</h2>
          <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 16px; line-height: 1.5; color: #444; white-space: pre-wrap;">
            ${message}
          </p>
          <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">This email was sent securely via your portfolio website.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully!', id: data?.id }, { status: 200 });
  } catch (error: any) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
