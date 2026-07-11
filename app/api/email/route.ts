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
      replyTo: replyTo,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #eaeaea; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
          <div style="background-color: #0f172a; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">New Portfolio Inquiry</h1>
          </div>
          <div style="padding: 40px 30px;">
            <p style="margin: 0 0 10px; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">From</p>
            <p style="margin: 0 0 20px; font-size: 18px; color: #0f172a; font-weight: 500;">
              ${senderName || 'Anonymous'} 
              <span style="color: #3b82f6; font-size: 15px; font-weight: 400; margin-left: 5px;">&lt;${replyTo || 'No email provided'}&gt;</span>
            </p>
            
            <p style="margin: 0 0 10px; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Message</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 4px;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">Sent securely from your portfolio contact form. You can reply directly to this email to respond to the sender.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
