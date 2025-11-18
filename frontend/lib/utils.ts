import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calculateATSScore(content: string): number {
  // Basic ATS score calculation (placeholder for actual AI implementation)
  const keywords = ["experience", "skills", "achievement", "project", "education"];
  const keywordCount = keywords.filter(keyword =>
    content.toLowerCase().includes(keyword)
  ).length;

  const hasQuantifiableMetrics = /\d+%|\d+\+/.test(content);
  const properLength = content.length > 500 && content.length < 5000;

  let score = 50;
  score += keywordCount * 5;
  score += hasQuantifiableMetrics ? 15 : 0;
  score += properLength ? 10 : 0;

  return Math.min(Math.max(score, 0), 100);
}
