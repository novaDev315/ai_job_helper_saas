import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (apiKey) {
      sgMail.setApiKey(apiKey);
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const msg = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL') || 'noreply@aijobhelper.com',
      subject: 'Welcome to AI Job Helper! 🎉',
      text: `Hi ${name},\n\nWelcome to AI Job Helper! We're excited to help you land your dream job.\n\nGet started by:\n1. Uploading your CV for AI optimization\n2. Tracking your job applications\n3. Generating tailored cover letters\n\nBest regards,\nThe AI Job Helper Team`,
      html: this.getWelcomeEmailHTML(name),
    };

    try {
      await sgMail.send(msg);
      console.log(`Welcome email sent to ${to}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Don't throw - email failures shouldn't break the flow
    }
  }

  async sendApplicationReminderEmail(
    to: string,
    name: string,
    company: string,
    position: string,
  ): Promise<void> {
    const msg = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL') || 'noreply@aijobhelper.com',
      subject: `Reminder: Follow up on your ${position} application`,
      text: `Hi ${name},\n\nThis is a reminder to follow up on your application for ${position} at ${company}.\n\nConsider:\n- Sending a follow-up email to the hiring manager\n- Checking the application status\n- Preparing for potential interviews\n\nGood luck!\n\nBest regards,\nThe AI Job Helper Team`,
      html: this.getReminderEmailHTML(name, company, position),
    };

    try {
      await sgMail.send(msg);
      console.log(`Reminder email sent to ${to}`);
    } catch (error) {
      console.error('Error sending reminder email:', error);
    }
  }

  async sendInterviewNotification(
    to: string,
    name: string,
    company: string,
    position: string,
    interviewDate: Date,
  ): Promise<void> {
    const msg = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL') || 'noreply@aijobhelper.com',
      subject: `Interview Reminder: ${position} at ${company}`,
      text: `Hi ${name},\n\nYour interview for ${position} at ${company} is coming up on ${interviewDate.toLocaleDateString()}.\n\nPrepare by:\n- Reviewing common interview questions\n- Researching the company\n- Practicing your STAR method responses\n- Preparing questions to ask\n\nGood luck!\n\nBest regards,\nThe AI Job Helper Team`,
      html: this.getInterviewEmailHTML(name, company, position, interviewDate),
    };

    try {
      await sgMail.send(msg);
      console.log(`Interview notification sent to ${to}`);
    } catch (error) {
      console.error('Error sending interview notification:', error);
    }
  }

  async sendWeeklyDigest(
    to: string,
    name: string,
    stats: {
      totalApplications: number;
      newApplications: number;
      interviews: number;
      offers: number;
    },
  ): Promise<void> {
    const msg = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL') || 'noreply@aijobhelper.com',
      subject: 'Your Weekly Job Search Summary 📊',
      text: `Hi ${name},\n\nHere's your job search summary for this week:\n\n- Total Applications: ${stats.totalApplications}\n- New Applications: ${stats.newApplications}\n- Active Interviews: ${stats.interviews}\n- Offers Received: ${stats.offers}\n\nKeep up the great work!\n\nBest regards,\nThe AI Job Helper Team`,
      html: this.getWeeklyDigestHTML(name, stats),
    };

    try {
      await sgMail.send(msg);
      console.log(`Weekly digest sent to ${to}`);
    } catch (error) {
      console.error('Error sending weekly digest:', error);
    }
  }

  private getWelcomeEmailHTML(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .features { margin: 20px 0; }
            .feature-item { padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to AI Job Helper! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We're thrilled to have you join AI Job Helper! Our AI-powered platform is here to help you land your dream job faster.</p>

              <div class="features">
                <h3>Get started with these features:</h3>
                <div class="feature-item">
                  <strong>✨ AI CV Optimization</strong><br>
                  Upload your CV and get instant ATS compatibility scores
                </div>
                <div class="feature-item">
                  <strong>📝 Smart Cover Letters</strong><br>
                  Generate tailored cover letters in seconds
                </div>
                <div class="feature-item">
                  <strong>📊 Application Tracker</strong><br>
                  Keep all your job applications organized in one place
                </div>
                <div class="feature-item">
                  <strong>🎯 Interview Prep</strong><br>
                  Practice with AI-generated questions specific to your target role
                </div>
              </div>

              <center>
                <a href="${this.configService.get('APP_URL') || 'http://localhost:3000'}/dashboard" class="button">
                  Go to Dashboard
                </a>
              </center>

              <p style="margin-top: 30px; color: #666;">
                Need help? Reply to this email or visit our help center.
              </p>

              <p>Best regards,<br>The AI Job Helper Team</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getReminderEmailHTML(name: string, company: string, position: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px; }
            .tip { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>⏰ Application Follow-up Reminder</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>This is a friendly reminder to follow up on your application for:</p>
              <p style="font-size: 18px; margin: 20px 0;">
                <strong>${position}</strong><br>
                at ${company}
              </p>

              <div class="tip">
                <strong>💡 Follow-up Tips:</strong>
                <ul>
                  <li>Send a polite follow-up email expressing continued interest</li>
                  <li>Reference your application date and the position</li>
                  <li>Keep it brief and professional</li>
                  <li>Check if there's any additional information you can provide</li>
                </ul>
              </div>

              <p>Good luck with your application!</p>
              <p>Best regards,<br>The AI Job Helper Team</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getInterviewEmailHTML(
    name: string,
    company: string,
    position: string,
    interviewDate: Date,
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px; }
            .checklist { background: #ecfdf5; padding: 20px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 Interview Coming Up!</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Your interview is scheduled for:</p>
              <p style="font-size: 18px; margin: 20px 0; text-align: center; background: #f3f4f6; padding: 20px; border-radius: 5px;">
                <strong>${position}</strong><br>
                at ${company}<br>
                📅 ${interviewDate.toLocaleDateString()} at ${interviewDate.toLocaleTimeString()}
              </p>

              <div class="checklist">
                <strong>✅ Interview Preparation Checklist:</strong>
                <ul>
                  <li>Research the company and recent news</li>
                  <li>Review the job description</li>
                  <li>Prepare STAR method examples</li>
                  <li>Prepare questions to ask the interviewer</li>
                  <li>Test your tech setup (for virtual interviews)</li>
                  <li>Plan your outfit and arrival time</li>
                </ul>
              </div>

              <p><strong>Need help preparing?</strong> Use our Interview Prep tool to practice common questions!</p>

              <p>Best of luck!</p>
              <p>Best regards,<br>The AI Job Helper Team</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private getWeeklyDigestHTML(
    name: string,
    stats: {
      totalApplications: number;
      newApplications: number;
      interviews: number;
      offers: number;
    },
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px; }
            .stats { display: flex; flex-wrap: wrap; gap: 15px; margin: 20px 0; }
            .stat-box { flex: 1; min-width: 120px; background: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; }
            .stat-number { font-size: 32px; font-weight: bold; color: #667eea; }
            .stat-label { font-size: 14px; color: #666; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📊 Your Weekly Job Search Summary</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Here's how your job search is going this week:</p>

              <div class="stats">
                <div class="stat-box">
                  <div class="stat-number">${stats.totalApplications}</div>
                  <div class="stat-label">Total Applications</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number">${stats.newApplications}</div>
                  <div class="stat-label">New This Week</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number">${stats.interviews}</div>
                  <div class="stat-label">Active Interviews</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number">${stats.offers}</div>
                  <div class="stat-label">Offers Received</div>
                </div>
              </div>

              <p><strong>Keep up the momentum!</strong> Consistency is key in your job search.</p>

              <p style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                💡 <strong>Tip:</strong> Don't forget to follow up on applications submitted 1-2 weeks ago.
              </p>

              <p>Best regards,<br>The AI Job Helper Team</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
