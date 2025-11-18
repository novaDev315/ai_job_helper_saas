import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { AiService } from '../common/ai/ai.service';

@Injectable()
export class CvService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async createResume(userId: string, title: string, originalContent: string) {
    return this.prisma.resume.create({
      data: {
        userId,
        title,
        originalContent,
      },
    });
  }

  async optimizeResume(resumeId: string, jobDescription?: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    const optimized = await this.aiService.optimizeCV(
      resume.originalContent,
      jobDescription,
    );

    return this.prisma.resume.update({
      where: { id: resumeId },
      data: {
        optimizedContent: optimized.content,
        atsScore: optimized.atsScore,
      },
    });
  }

  async getUserResumes(userId: string) {
    return this.prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getResume(id: string) {
    return this.prisma.resume.findUnique({
      where: { id },
    });
  }
}
