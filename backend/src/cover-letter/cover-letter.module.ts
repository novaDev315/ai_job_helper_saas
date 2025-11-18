import { Module } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterResolver } from './cover-letter.resolver';
import { AiService } from '../common/ai/ai.service';

@Module({
  providers: [CoverLetterService, CoverLetterResolver, AiService],
})
export class CoverLetterModule {}
