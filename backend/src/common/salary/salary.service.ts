import { Injectable } from '@nestjs/common';

interface SalaryData {
  role: string;
  location: string;
  experienceLevel: string;
  base: {
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
  bonus: {
    p25: number;
    p50: number;
    p75: number;
  };
  stock: {
    p25: number;
    p50: number;
    p75: number;
  };
  totalComp: {
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
  trend: { year: number; salary: number }[];
  byCompany: { company: string; base: number; totalComp: number }[];
  byLocation: { location: string; salary: number }[];
}

@Injectable()
export class SalaryService {
  // In production, this would integrate with:
  // - Levels.fyi API
  // - Glassdoor API
  // - Payscale API
  // - LinkedIn Salary API

  async getSalaryData(
    role: string,
    location: string,
    experienceLevel: string,
  ): Promise<SalaryData> {
    // Mock salary data based on role
    const baseSalaries: Record<string, number> = {
      'software engineer': 150000,
      'senior software engineer': 185000,
      'staff software engineer': 250000,
      'principal engineer': 320000,
      'product manager': 160000,
      'senior product manager': 200000,
      'data scientist': 155000,
      'machine learning engineer': 180000,
      'devops engineer': 145000,
      'frontend developer': 140000,
      'backend developer': 150000,
      'full stack developer': 145000,
    };

    const normalizedRole = role.toLowerCase();
    const baseSalary = baseSalaries[normalizedRole] || 140000;

    // Location adjustments
    const locationMultipliers: Record<string, number> = {
      'san francisco': 1.2,
      'new york': 1.15,
      'seattle': 1.1,
      'los angeles': 1.05,
      'austin': 0.95,
      'denver': 0.9,
      'remote': 1.0,
      'chicago': 0.95,
      'boston': 1.1,
    };

    const normalizedLocation = location.toLowerCase();
    const locationMultiplier = locationMultipliers[normalizedLocation] || 1.0;

    // Experience adjustments
    const experienceMultipliers: Record<string, number> = {
      'entry': 0.7,
      'mid': 1.0,
      'senior': 1.3,
      'staff': 1.6,
      'principal': 2.0,
    };

    const expMultiplier = experienceMultipliers[experienceLevel.toLowerCase()] || 1.0;

    const adjustedBase = Math.round(baseSalary * locationMultiplier * expMultiplier);

    return {
      role,
      location,
      experienceLevel,
      base: {
        p25: Math.round(adjustedBase * 0.85),
        p50: adjustedBase,
        p75: Math.round(adjustedBase * 1.15),
        p90: Math.round(adjustedBase * 1.35),
      },
      bonus: {
        p25: Math.round(adjustedBase * 0.1),
        p50: Math.round(adjustedBase * 0.15),
        p75: Math.round(adjustedBase * 0.2),
      },
      stock: {
        p25: Math.round(adjustedBase * 0.15),
        p50: Math.round(adjustedBase * 0.25),
        p75: Math.round(adjustedBase * 0.4),
      },
      totalComp: {
        p25: Math.round(adjustedBase * 1.1),
        p50: Math.round(adjustedBase * 1.4),
        p75: Math.round(adjustedBase * 1.75),
        p90: Math.round(adjustedBase * 2.1),
      },
      trend: this.generateSalaryTrend(adjustedBase),
      byCompany: this.getByCompanyData(normalizedRole),
      byLocation: this.getByLocationData(baseSalary * expMultiplier),
    };
  }

  private generateSalaryTrend(currentSalary: number): { year: number; salary: number }[] {
    const currentYear = new Date().getFullYear();
    const trend = [];

    for (let i = 5; i >= 0; i--) {
      const yearSalary = Math.round(currentSalary * (1 - i * 0.05));
      trend.push({
        year: currentYear - i,
        salary: yearSalary,
      });
    }

    return trend;
  }

  private getByCompanyData(role: string): { company: string; base: number; totalComp: number }[] {
    // Mock company salary data
    const companies = [
      { company: 'Netflix', baseMultiplier: 1.4, tcMultiplier: 1.5 },
      { company: 'Google', baseMultiplier: 1.1, tcMultiplier: 1.8 },
      { company: 'Meta', baseMultiplier: 1.05, tcMultiplier: 1.75 },
      { company: 'Apple', baseMultiplier: 1.0, tcMultiplier: 1.6 },
      { company: 'Amazon', baseMultiplier: 0.95, tcMultiplier: 1.55 },
      { company: 'Microsoft', baseMultiplier: 0.95, tcMultiplier: 1.45 },
      { company: 'Stripe', baseMultiplier: 1.1, tcMultiplier: 1.65 },
      { company: 'Airbnb', baseMultiplier: 1.05, tcMultiplier: 1.6 },
    ];

    const baseSalary = 175000; // Base for this calculation

    return companies.map((c) => ({
      company: c.company,
      base: Math.round(baseSalary * c.baseMultiplier),
      totalComp: Math.round(baseSalary * c.tcMultiplier),
    })).sort((a, b) => b.totalComp - a.totalComp);
  }

  private getByLocationData(baseSalary: number): { location: string; salary: number }[] {
    const locations = [
      { location: 'San Francisco', multiplier: 1.2 },
      { location: 'New York', multiplier: 1.15 },
      { location: 'Seattle', multiplier: 1.1 },
      { location: 'Boston', multiplier: 1.08 },
      { location: 'Los Angeles', multiplier: 1.05 },
      { location: 'Austin', multiplier: 0.95 },
      { location: 'Denver', multiplier: 0.9 },
      { location: 'Remote', multiplier: 1.0 },
    ];

    return locations.map((l) => ({
      location: l.location,
      salary: Math.round(baseSalary * l.multiplier),
    })).sort((a, b) => b.salary - a.salary);
  }

  async getNegotiationTips(
    role: string,
    currentOffer: number,
    targetSalary: number,
  ): Promise<string[]> {
    const tips: string[] = [
      `Based on market data, your target of $${targetSalary.toLocaleString()} is within the 75th percentile for ${role} roles.`,
      "Don't forget to negotiate equity - at tech companies, stock can be 20-40% of total compensation.",
      'Signing bonuses are often more negotiable than base salary and can add $20K-$50K.',
      'If the base salary is firm, negotiate for additional benefits: PTO, remote work, equity vesting schedule.',
      'Always get competing offers if possible - they significantly strengthen your negotiating position.',
      "Be prepared to justify your ask with specific achievements and market data.",
      "Consider the total compensation package, not just base salary.",
    ];

    return tips;
  }
}
