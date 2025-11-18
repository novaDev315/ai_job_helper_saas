import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async optimizeCV(
    cvContent: string,
    jobDescription?: string,
  ): Promise<{ content: string; atsScore: number }> {
    const prompt = jobDescription
      ? `Optimize the following CV for this job description:\n\nJob Description:\n${jobDescription}\n\nCV:\n${cvContent}\n\nProvide an optimized version that improves ATS compatibility and highlights relevant skills.`
      : `Optimize the following CV for ATS systems and general best practices:\n\n${cvContent}\n\nImprove formatting, keywords, and content structure.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert CV optimizer. Analyze CVs and provide optimized versions with better ATS compatibility and professional formatting.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      const optimizedContent = completion.choices[0]?.message?.content || cvContent;
      const atsScore = this.calculateATSScore(optimizedContent);

      return {
        content: optimizedContent,
        atsScore,
      };
    } catch (error) {
      console.error('Error optimizing CV:', error);
      return {
        content: cvContent,
        atsScore: this.calculateATSScore(cvContent),
      };
    }
  }

  async generateCoverLetter(
    cvContent: string,
    jobDescription: string,
    tone: string = 'professional',
  ): Promise<string> {
    const prompt = `Generate a compelling cover letter for the following job application:\n\nCV:\n${cvContent}\n\nJob Description:\n${jobDescription}\n\nTone: ${tone}\n\nCreate a personalized, engaging cover letter that highlights relevant experience and skills.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert cover letter writer. Create compelling, personalized cover letters that stand out.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
      });

      return completion.choices[0]?.message?.content || 'Unable to generate cover letter';
    } catch (error) {
      console.error('Error generating cover letter:', error);
      return 'Unable to generate cover letter at this time.';
    }
  }

  async generateInterviewQuestions(
    jobDescription: string,
    companyName: string,
  ): Promise<any[]> {
    const prompt = `Generate 10 likely interview questions for this position:\n\nCompany: ${companyName}\n\nJob Description:\n${jobDescription}\n\nProvide questions in JSON format with fields: question, category, difficulty.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert interview coach. Generate realistic interview questions based on job descriptions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content || '[]';
      try {
        return JSON.parse(content);
      } catch {
        return [];
      }
    } catch (error) {
      console.error('Error generating interview questions:', error);
      return [];
    }
  }

  private calculateATSScore(content: string): number {
    const keywords = [
      'experience',
      'skills',
      'achievement',
      'project',
      'education',
      'certification',
      'leadership',
      'team',
      'managed',
      'developed',
    ];

    let score = 50;

    // Check for keywords
    keywords.forEach((keyword) => {
      if (content.toLowerCase().includes(keyword)) {
        score += 3;
      }
    });

    // Check for quantifiable metrics
    if (/\d+%|\d+\+|\d+ years?/.test(content)) {
      score += 15;
    }

    // Check content length
    if (content.length > 500 && content.length < 5000) {
      score += 10;
    }

    // Check formatting (sections)
    const sections = [
      'experience',
      'education',
      'skills',
      'summary',
      'objective',
    ];
    sections.forEach((section) => {
      if (content.toLowerCase().includes(section)) {
        score += 2;
      }
    });

    return Math.min(Math.max(score, 0), 100);
  }
}
