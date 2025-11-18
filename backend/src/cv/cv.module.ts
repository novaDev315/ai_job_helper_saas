import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvResolver } from './cv.resolver';
import { AiService } from '../common/ai/ai.service';

@Module({
  providers: [CvService, CvResolver, AiService],
})
export class CvModule {}
