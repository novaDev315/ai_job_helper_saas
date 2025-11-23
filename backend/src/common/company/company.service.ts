import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface CompanyInfo {
  name: string;
  description: string;
  industry: string;
  size: string;
  founded: string;
  headquarters: string;
  website: string;
  linkedIn: string;
  glassdoorRating: number;
  culture: string[];
  benefits: string[];
  techStack: string[];
  recentNews: { title: string; date: string; url: string }[];
  interviewTips: string[];
}

@Injectable()
export class CompanyService {
  constructor(private readonly configService: ConfigService) {}

  async getCompanyInfo(companyName: string): Promise<CompanyInfo> {
    // In production, this would call external APIs like:
    // - Clearbit Company API
    // - LinkedIn Company API
    // - Glassdoor API
    // - News APIs

    // Mock company data for demonstration
    const mockCompanies: Record<string, CompanyInfo> = {
      google: {
        name: 'Google',
        description: 'A multinational technology company specializing in Internet-related services and products.',
        industry: 'Technology',
        size: '100,000+ employees',
        founded: '1998',
        headquarters: 'Mountain View, CA',
        website: 'https://google.com',
        linkedIn: 'https://linkedin.com/company/google',
        glassdoorRating: 4.5,
        culture: [
          'Innovation-driven',
          'Data-informed decisions',
          'Open communication',
          '20% time for side projects',
          'Flat hierarchy',
        ],
        benefits: [
          'Competitive salary',
          'Equity packages',
          'Free meals',
          'On-site wellness',
          'Generous PTO',
          'Parental leave',
        ],
        techStack: ['Go', 'Python', 'Java', 'C++', 'Kubernetes', 'TensorFlow', 'BigQuery'],
        recentNews: [
          { title: 'Google announces new AI features', date: '2025-01-15', url: '#' },
          { title: 'Cloud revenue grows 30%', date: '2025-01-10', url: '#' },
        ],
        interviewTips: [
          'Practice coding on whiteboard',
          'Review system design concepts',
          'Prepare behavioral questions using STAR method',
          'Research recent Google products and initiatives',
        ],
      },
      meta: {
        name: 'Meta',
        description: 'A technology company focused on social networking and the metaverse.',
        industry: 'Technology / Social Media',
        size: '50,000+ employees',
        founded: '2004',
        headquarters: 'Menlo Park, CA',
        website: 'https://meta.com',
        linkedIn: 'https://linkedin.com/company/meta',
        glassdoorRating: 4.3,
        culture: [
          'Move fast',
          'Be bold',
          'Focus on impact',
          'Build social value',
          'Openness',
        ],
        benefits: [
          'Competitive compensation',
          'RSU packages',
          'Free food',
          'Wellness programs',
          'Generous parental leave',
        ],
        techStack: ['React', 'GraphQL', 'PHP/Hack', 'Python', 'PyTorch', 'MySQL'],
        recentNews: [
          { title: 'Meta expands VR initiatives', date: '2025-01-12', url: '#' },
          { title: 'AI investments increase', date: '2025-01-08', url: '#' },
        ],
        interviewTips: [
          'Expect multiple coding rounds',
          'System design is crucial for senior roles',
          'Know Meta\'s products and values',
          'Prepare for behavioral interviews',
        ],
      },
      amazon: {
        name: 'Amazon',
        description: 'E-commerce and cloud computing company with diverse business segments.',
        industry: 'Technology / E-commerce',
        size: '1,500,000+ employees',
        founded: '1994',
        headquarters: 'Seattle, WA',
        website: 'https://amazon.com',
        linkedIn: 'https://linkedin.com/company/amazon',
        glassdoorRating: 4.1,
        culture: [
          'Customer obsession',
          'Ownership',
          'Invent and simplify',
          'Bias for action',
          'Earn trust',
        ],
        benefits: [
          'Competitive salary',
          'Stock options',
          'Career development',
          'Health benefits',
          'Employee discounts',
        ],
        techStack: ['Java', 'Python', 'AWS', 'DynamoDB', 'React', 'Kotlin'],
        recentNews: [
          { title: 'AWS launches new services', date: '2025-01-14', url: '#' },
          { title: 'Amazon expands logistics network', date: '2025-01-09', url: '#' },
        ],
        interviewTips: [
          'Know the Leadership Principles inside out',
          'Prepare STAR stories for each LP',
          'Expect bar raiser interviews',
          'Practice data structure problems',
        ],
      },
    };

    const normalizedName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Return matching company or generate generic info
    if (mockCompanies[normalizedName]) {
      return mockCompanies[normalizedName];
    }

    // Generate generic company info
    return {
      name: companyName,
      description: `${companyName} is a company in the technology sector.`,
      industry: 'Technology',
      size: 'Unknown',
      founded: 'Unknown',
      headquarters: 'Unknown',
      website: `https://${normalizedName}.com`,
      linkedIn: `https://linkedin.com/company/${normalizedName}`,
      glassdoorRating: 0,
      culture: ['Information not available'],
      benefits: ['Information not available'],
      techStack: ['Information not available'],
      recentNews: [],
      interviewTips: [
        'Research the company website',
        'Check their LinkedIn page for recent updates',
        'Review Glassdoor for interview experiences',
        'Prepare questions about the role and team',
      ],
    };
  }

  async getCompanySalaryData(companyName: string, role: string): Promise<{
    base: { min: number; max: number; median: number };
    bonus: { min: number; max: number; median: number };
    stock: { min: number; max: number; median: number };
    totalComp: { min: number; max: number; median: number };
  }> {
    // Mock salary data - in production, this would call salary APIs
    return {
      base: { min: 150000, max: 220000, median: 185000 },
      bonus: { min: 15000, max: 50000, median: 30000 },
      stock: { min: 50000, max: 150000, median: 80000 },
      totalComp: { min: 215000, max: 420000, median: 295000 },
    };
  }
}
