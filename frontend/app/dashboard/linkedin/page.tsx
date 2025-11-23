"use client";

import { useState } from "react";
import { Linkedin, Sparkles, Copy, Check, TrendingUp, Users, Eye, MessageSquare, Zap, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface OptimizationResult {
  section: string;
  original: string;
  optimized: string;
  keywords: string[];
  score: number;
  tips: string[];
}

export default function LinkedInOptimizerPage() {
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const handleOptimize = async () => {
    if (!headline && !summary) {
      toast({
        title: "Missing information",
        description: "Please provide at least your headline or summary to optimize.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Mock optimization results
      const mockResults: OptimizationResult[] = [];

      if (headline) {
        mockResults.push({
          section: "Headline",
          original: headline,
          optimized: `${targetRole || "Software Engineer"} | Building scalable solutions | ${headline.includes("@") ? headline : "Open to opportunities"} | Ex-FAANG`,
          keywords: ["Software Engineer", "scalable", "FAANG", "opportunities"],
          score: 85,
          tips: [
            "Include your target job title at the beginning",
            "Add measurable achievements or specialties",
            "Mention notable companies or credentials",
            "Keep it under 120 characters for full visibility"
          ]
        });
      }

      if (summary) {
        mockResults.push({
          section: "About/Summary",
          original: summary,
          optimized: `🚀 ${targetRole || "Software Engineer"} with 5+ years of experience building products that impact millions of users.\n\n💡 I specialize in:\n• Full-stack development (React, Node.js, Python)\n• System design & architecture\n• Leading cross-functional teams\n\n🎯 Currently focused on AI/ML integration and cloud-native solutions.\n\n📫 Let's connect! I'm always interested in discussing technology, career growth, and new opportunities.\n\n#SoftwareEngineering #TechLeadership #Innovation`,
          keywords: ["Software Engineer", "full-stack", "React", "Node.js", "AI/ML", "system design"],
          score: 90,
          tips: [
            "Start with a hook or emoji to grab attention",
            "Use bullet points for easy scanning",
            "Include relevant keywords for search",
            "Add a call-to-action at the end",
            "Use hashtags for discoverability"
          ]
        });
      }

      if (experience) {
        mockResults.push({
          section: "Experience",
          original: experience,
          optimized: `Senior Software Engineer | TechCorp Inc.\n• Led development of microservices architecture serving 10M+ daily active users\n• Reduced system latency by 40% through performance optimization initiatives\n• Mentored team of 5 junior developers, improving code quality metrics by 25%\n• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes\n• Technologies: React, Node.js, AWS, Kubernetes, PostgreSQL`,
          keywords: ["Led", "Reduced", "Mentored", "Implemented", "microservices", "AWS"],
          score: 88,
          tips: [
            "Start bullets with strong action verbs",
            "Include quantifiable achievements (numbers, percentages)",
            "Mention technologies and tools used",
            "Show leadership and collaboration",
            "Keep each bullet to 1-2 lines"
          ]
        });
      }

      setResults(mockResults);
      setOverallScore(Math.round(mockResults.reduce((acc, r) => acc + r.score, 0) / mockResults.length));

      toast({
        title: "Optimization complete!",
        description: `Your LinkedIn profile score: ${Math.round(mockResults.reduce((acc, r) => acc + r.score, 0) / mockResults.length)}/100`,
      });
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    toast({
      title: "Copied!",
      description: `${section} copied to clipboard.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Linkedin className="h-8 w-8 text-blue-600" />
            LinkedIn Profile Optimizer
          </h2>
          <p className="text-muted-foreground">Optimize your LinkedIn profile to attract more recruiters and opportunities</p>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+156%</div>
            <p className="text-xs text-muted-foreground">Average increase after optimization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Appearances</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+89%</div>
            <p className="text-xs text-muted-foreground">More recruiter searches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connection Requests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+67%</div>
            <p className="text-xs text-muted-foreground">More incoming requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">InMail Response</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+42%</div>
            <p className="text-xs text-muted-foreground">Better response rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Current Profile</CardTitle>
            <CardDescription>Paste your LinkedIn profile sections to optimize</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetRole">Target Role (Optional)</Label>
              <Input
                id="targetRole"
                placeholder="e.g., Senior Software Engineer, Product Manager"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Current Headline</Label>
              <Input
                id="headline"
                placeholder="Your current LinkedIn headline..."
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{headline.length}/120 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">About/Summary Section</Label>
              <Textarea
                id="summary"
                placeholder="Paste your current LinkedIn summary..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Most Recent)</Label>
              <Textarea
                id="experience"
                placeholder="Paste your most recent job experience..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={handleOptimize} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Optimize Profile
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          {overallScore !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Overall Profile Score
                  <span className={`text-3xl font-bold ${overallScore >= 80 ? "text-green-600" : overallScore >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                    {overallScore}/100
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-3 rounded-full transition-all ${overallScore >= 80 ? "bg-green-600" : overallScore >= 60 ? "bg-yellow-600" : "bg-red-600"}`}
                    style={{ width: `${overallScore}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {result.section}
                  <span className={`text-lg font-bold ${result.score >= 80 ? "text-green-600" : result.score >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                    {result.score}/100
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">OPTIMIZED VERSION</Label>
                  <div className="mt-1 rounded-lg border bg-green-50 p-3 dark:bg-green-950">
                    <pre className="whitespace-pre-wrap text-sm">{result.optimized}</pre>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleCopy(result.optimized, result.section)}
                  >
                    {copied === result.section ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    Copy
                  </Button>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">KEYWORDS TO INCLUDE</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {result.keywords.map((keyword, i) => (
                      <span key={i} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    OPTIMIZATION TIPS
                  </Label>
                  <ul className="mt-1 space-y-1">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}

          {results.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Linkedin className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Enter your LinkedIn profile information and click "Optimize Profile" to get AI-powered suggestions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
