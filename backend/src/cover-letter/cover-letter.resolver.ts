import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoverLetterService } from './cover-letter.service';

@Resolver()
export class CoverLetterResolver {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  @Query(() => String)
  async getCoverLetter(@Args('id') id: string): Promise<string> {
    const coverLetter = await this.coverLetterService.getCoverLetter(id);
    return JSON.stringify(coverLetter);
  }

  @Query(() => String)
  async getUserCoverLetters(@Args('userId') userId: string): Promise<string> {
    const coverLetters = await this.coverLetterService.getUserCoverLetters(userId);
    return JSON.stringify(coverLetters);
  }

  @Mutation(() => String)
  async generateCoverLetter(
    @Args('userId') userId: string,
    @Args('resumeId') resumeId: string,
    @Args('jobDescription') jobDescription: string,
    @Args('jobApplicationId', { nullable: true }) jobApplicationId?: string,
    @Args('tone', { nullable: true }) tone?: string,
  ): Promise<string> {
    const coverLetter = await this.coverLetterService.generateCoverLetter(
      userId,
      resumeId,
      jobDescription,
      jobApplicationId,
      tone,
    );
    return JSON.stringify(coverLetter);
  }
}
