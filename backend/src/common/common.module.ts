import { Module } from '@nestjs/common';
import { CompanyService } from './company/company.service';
import { ReminderService } from './reminder/reminder.service';
import { SalaryService } from './salary/salary.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  providers: [CompanyService, ReminderService, SalaryService],
  exports: [CompanyService, ReminderService, SalaryService],
})
export class CommonModule {}
