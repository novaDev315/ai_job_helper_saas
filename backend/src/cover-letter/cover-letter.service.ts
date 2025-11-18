import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { AiService } from '../common/ai/ai.service';

@Injectable()
export class CoverLetterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async generateCoverLetter(
    userId: string,
    resumeId: string,
    jobDescription: string,
    jobApplicationId?: string,
    tone: string = 'professional',
  ) {
    const resume = await this.prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    const content = await this.aiService.generateCoverLetter(
      resume.originalContent,
      jobDescription,
      tone,
    );

    return this.prisma.coverLetter.create({
      data: {
        userId,
        resumeId,
        jobApplicationId,
        content,
        tone,
        aiGenerated: true,
      },
    });
  }

  async getUserCoverLetters(userId: string) {
    return this.prisma.coverLetter.findMany({
      where: { userId },
      include: {
        resume: true,
        jobApplication: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCoverLetter(id: string) {
    return this.prisma.coverLetter.findUnique({
      where: { id },
      include: {
        resume: true,
        jobApplication: true,
      },
    });
  }
}
