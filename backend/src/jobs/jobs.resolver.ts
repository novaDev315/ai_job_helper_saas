import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { ApplicationStatus } from '@prisma/client';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => String)
  async getUserApplications(@Args('userId') userId: string): Promise<string> {
    const applications = await this.jobsService.getUserApplications(userId);
    return JSON.stringify(applications);
  }

  @Query(() => String)
  async getApplication(@Args('id') id: string): Promise<string> {
    const application = await this.jobsService.getApplication(id);
    return JSON.stringify(application);
  }

  @Query(() => String)
  async getApplicationStats(@Args('userId') userId: string): Promise<string> {
    const stats = await this.jobsService.getApplicationStats(userId);
    return JSON.stringify(stats);
  }

  @Mutation(() => String)
  async createApplication(
    @Args('userId') userId: string,
    @Args('company') company: string,
    @Args('position') position: string,
    @Args('jobDescription', { nullable: true }) jobDescription?: string,
    @Args('jobUrl', { nullable: true }) jobUrl?: string,
    @Args('location', { nullable: true }) location?: string,
    @Args('salary', { nullable: true }) salary?: string,
    @Args('resumeId', { nullable: true }) resumeId?: string,
  ): Promise<string> {
    const application = await this.jobsService.createApplication({
      userId,
      company,
      position,
      jobDescription,
      jobUrl,
      location,
      salary,
      resumeId,
    });
    return JSON.stringify(application);
  }

  @Mutation(() => String)
  async updateApplicationStatus(
    @Args('id') id: string,
    @Args('status') status: ApplicationStatus,
  ): Promise<string> {
    const application = await this.jobsService.updateApplicationStatus(id, status);
    return JSON.stringify(application);
  }

  @Mutation(() => String)
  async deleteApplication(@Args('id') id: string): Promise<string> {
    await this.jobsService.deleteApplication(id);
    return JSON.stringify({ success: true });
  }
}
