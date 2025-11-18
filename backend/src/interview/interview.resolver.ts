import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InterviewService } from './interview.service';

@Resolver()
export class InterviewResolver {
  constructor(private readonly interviewService: InterviewService) {}

  @Query(() => String)
  async getInterviewPrep(@Args('id') id: string): Promise<string> {
    const interviewPrep = await this.interviewService.getInterviewPrep(id);
    return JSON.stringify(interviewPrep);
  }

  @Query(() => String)
  async getUserInterviewPreps(@Args('userId') userId: string): Promise<string> {
    const interviewPreps = await this.interviewService.getUserInterviewPreps(userId);
    return JSON.stringify(interviewPreps);
  }

  @Mutation(() => String)
  async generateInterviewPrep(
    @Args('userId') userId: string,
    @Args('jobApplicationId') jobApplicationId: string,
  ): Promise<string> {
    const interviewPrep = await this.interviewService.generateInterviewPrep(
      userId,
      jobApplicationId,
    );
    return JSON.stringify(interviewPrep);
  }
}
