import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ApplicationStatus } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApplication(data: {
    userId: string;
    company: string;
    position: string;
    jobDescription?: string;
    jobUrl?: string;
    location?: string;
    salary?: string;
    resumeId?: string;
  }) {
    return this.prisma.jobApplication.create({
      data: {
        ...data,
        status: 'APPLIED',
      },
    });
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus) {
    return this.prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
  }

  async getUserApplications(userId: string) {
    return this.prisma.jobApplication.findMany({
      where: { userId },
      include: {
        resume: true,
        coverLetters: true,
      },
      orderBy: { appliedDate: 'desc' },
    });
  }

  async getApplication(id: string) {
    return this.prisma.jobApplication.findUnique({
      where: { id },
      include: {
        resume: true,
        coverLetters: true,
        interviewPreps: true,
      },
    });
  }

  async deleteApplication(id: string) {
    return this.prisma.jobApplication.delete({
      where: { id },
    });
  }

  async getApplicationStats(userId: string) {
    const applications = await this.prisma.jobApplication.findMany({
      where: { userId },
    });

    const stats = {
      total: applications.length,
      applied: applications.filter((a) => a.status === 'APPLIED').length,
      interview: applications.filter((a) => a.status === 'INTERVIEW').length,
      offer: applications.filter((a) => a.status === 'OFFER').length,
      rejected: applications.filter((a) => a.status === 'REJECTED').length,
    };

    return stats;
  }
}
