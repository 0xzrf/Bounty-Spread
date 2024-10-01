import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const runtime = 'edge';

export interface incomingData {
  email: string,
  type: string,
  message: string
}

export async function POST(request: NextRequest) {
  const { email, type,  message }:incomingData = await request.json();
  const EMAIL_JOON = process.env.EMAIL_JOON;
  const EMAIL_JOON_PASSWORD = process.env.EMAIL_JOON_PASSWORD;
  const EMAIL_AMOR = process.env.EMAIL_AMOR;
  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these setings:

      host: "smtp.gmail.com",
      port: 465,
      secure: true

      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: EMAIL_JOON,
      pass: EMAIL_JOON_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: email,
    to: EMAIL_JOON,
    cc: EMAIL_AMOR, 
    subject: `${type} from ${email}`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({  success: true, message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}