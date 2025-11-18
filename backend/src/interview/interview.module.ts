import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewResolver } from './interview.resolver';
import { AiService } from '../common/ai/ai.service';

@Module({
  providers: [InterviewService, InterviewResolver, AiService],
})
export class InterviewModule {}
