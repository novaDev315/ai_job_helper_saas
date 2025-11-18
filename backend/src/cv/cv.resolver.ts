import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CvService } from './cv.service';

@Resolver()
export class CvResolver {
  constructor(private readonly cvService: CvService) {}

  @Query(() => String)
  async getResumeById(@Args('id') id: string): Promise<string> {
    const resume = await this.cvService.getResume(id);
    return JSON.stringify(resume);
  }

  @Query(() => String)
  async getUserResumes(@Args('userId') userId: string): Promise<string> {
    const resumes = await this.cvService.getUserResumes(userId);
    return JSON.stringify(resumes);
  }

  @Mutation(() => String)
  async createResume(
    @Args('userId') userId: string,
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<string> {
    const resume = await this.cvService.createResume(userId, title, content);
    return JSON.stringify(resume);
  }

  @Mutation(() => String)
  async optimizeResume(
    @Args('resumeId') resumeId: string,
    @Args('jobDescription', { nullable: true }) jobDescription?: string,
  ): Promise<string> {
    const resume = await this.cvService.optimizeResume(resumeId, jobDescription);
    return JSON.stringify(resume);
  }
}
