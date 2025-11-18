import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { AiService } from '../common/ai/ai.service';

@Injectable()
export class InterviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async generateInterviewPrep(
    userId: string,
    jobApplicationId: string,
  ) {
    const jobApplication = await this.prisma.jobApplication.findUnique({
      where: { id: jobApplicationId },
    });

    if (!jobApplication) {
      throw new Error('Job application not found');
    }

    const questions = await this.aiService.generateInterviewQuestions(
      jobApplication.jobDescription || '',
      jobApplication.company,
    );

    return this.prisma.interviewPrep.create({
      data: {
        userId,
        jobApplicationId,
        questions,
        companyResearch: `Research for ${jobApplication.company}`,
      },
    });
  }

  async getUserInterviewPreps(userId: string) {
    return this.prisma.interviewPrep.findMany({
      where: { userId },
      include: {
        jobApplication: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInterviewPrep(id: string) {
    return this.prisma.interviewPrep.findUnique({
      where: { id },
      include: {
        jobApplication: true,
      },
    });
  }
}
