import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../../email/email.service';

interface Reminder {
  id: string;
  userId: string;
  type: 'follow-up' | 'interview' | 'deadline' | 'custom';
  title: string;
  description?: string;
  company: string;
  position: string;
  dueDate: Date;
  completed: boolean;
  jobApplicationId?: string;
}

@Injectable()
export class ReminderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createReminder(
    userId: string,
    data: {
      type: 'follow-up' | 'interview' | 'deadline' | 'custom';
      title: string;
      description?: string;
      company: string;
      position: string;
      dueDate: Date;
      jobApplicationId?: string;
    },
  ): Promise<Reminder> {
    // In production, this would create a reminder in the database
    // and schedule a notification job
    const reminder: Reminder = {
      id: Date.now().toString(),
      userId,
      ...data,
      completed: false,
    };

    console.log(`Reminder created: ${reminder.title} for ${reminder.dueDate}`);
    return reminder;
  }

  async getUserReminders(userId: string): Promise<Reminder[]> {
    // Mock reminders - in production, this would query the database
    const now = new Date();

    return [
      {
        id: '1',
        userId,
        type: 'follow-up',
        title: 'Follow up on application',
        company: 'Google',
        position: 'Senior Software Engineer',
        dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days
        completed: false,
      },
      {
        id: '2',
        userId,
        type: 'interview',
        title: 'Technical Interview',
        description: 'System design round with hiring manager',
        company: 'Meta',
        position: 'Frontend Developer',
        dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days
        completed: false,
      },
      {
        id: '3',
        userId,
        type: 'follow-up',
        title: 'Send thank you note',
        company: 'Amazon',
        position: 'Full Stack Developer',
        dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days
        completed: false,
      },
    ];
  }

  async getUpcomingReminders(userId: string, days: number = 7): Promise<Reminder[]> {
    const reminders = await this.getUserReminders(userId);
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return reminders.filter(
      (r) => !r.completed && r.dueDate >= now && r.dueDate <= futureDate,
    );
  }

  async markReminderComplete(reminderId: string): Promise<void> {
    console.log(`Reminder ${reminderId} marked as complete`);
    // In production, this would update the database
  }

  async sendReminderNotifications(): Promise<void> {
    // This would be called by a cron job
    // Get all users with reminders due today or tomorrow
    // Send email notifications

    console.log('Sending reminder notifications...');
  }

  async createFollowUpReminder(
    userId: string,
    jobApplicationId: string,
    company: string,
    position: string,
    daysFromNow: number = 7,
  ): Promise<Reminder> {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysFromNow);

    return this.createReminder(userId, {
      type: 'follow-up',
      title: `Follow up on ${position} application`,
      description: `It's been ${daysFromNow} days since you applied. Consider sending a follow-up email.`,
      company,
      position,
      dueDate,
      jobApplicationId,
    });
  }

  async createInterviewReminder(
    userId: string,
    jobApplicationId: string,
    company: string,
    position: string,
    interviewDate: Date,
  ): Promise<Reminder> {
    // Create reminder 1 day before interview
    const reminderDate = new Date(interviewDate);
    reminderDate.setDate(reminderDate.getDate() - 1);

    return this.createReminder(userId, {
      type: 'interview',
      title: `Interview tomorrow: ${position} at ${company}`,
      description: 'Review your interview prep notes and get a good night\'s sleep!',
      company,
      position,
      dueDate: reminderDate,
      jobApplicationId,
    });
  }

  getDaysUntilReminder(reminder: Reminder): number {
    const now = new Date();
    const diff = reminder.dueDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
