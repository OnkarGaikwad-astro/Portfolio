export interface SendEmailPayload {
  subject: string;
  message: string;
  senderName?: string;
  replyTo?: string;
}

export async function sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    return { success: true, message: data.message || 'Email sent successfully!' };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
}
