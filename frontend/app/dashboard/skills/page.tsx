"use client";

import { useState } from "react";
import { TrendingUp, Target, BookOpen, CheckCircle, AlertTriangle, XCircle, Sparkles, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface SkillGap {
  skill: string;
  required: "Required" | "Preferred" | "Nice to have";
  yourLevel: "Expert" | "Intermediate" | "Beginner" | "None";
  gap: "No Gap" | "Minor Gap" | "Major Gap";
  resources: { name: string; type: string; url: string }[];
}

interface AnalysisResult {
  matchScore: number;
  skillsMatched: string[];
  skillGaps: SkillGap[];
  recommendations: string[];
  learningPath: { skill: string; priority: number; estimatedTime: string }[];
}

export default function SkillsGapAnalyzerPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const addSkill = () => {
    if (newSkill.trim() && !userSkills.includes(newSkill.trim())) {
      setUserSkills([...userSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setUserSkills(userSkills.filter((s) => s !== skill));
  };

  const handleAnalyze = async () => {
    if (!jobDescription) {
      toast({
        title: "Missing job description",
        description: "Please paste a job description to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Mock analysis result
      const mockResult: AnalysisResult = {
        matchScore: 72,
        skillsMatched: [
          "JavaScript",
          "React",
          "TypeScript",
          "Node.js",
          "Git",
          "Agile",
        ],
        skillGaps: [
          {
            skill: "Kubernetes",
            required: "Required",
            yourLevel: "Beginner",
            gap: "Major Gap",
            resources: [
              { name: "Kubernetes for Developers", type: "Course", url: "https://www.udemy.com" },
              { name: "K8s Documentation", type: "Docs", url: "https://kubernetes.io" },
            ],
          },
          {
            skill: "AWS",
            required: "Required",
            yourLevel: "Intermediate",
            gap: "Minor Gap",
            resources: [
              { name: "AWS Certified Solutions Architect", type: "Certification", url: "https://aws.amazon.com" },
            ],
          },
          {
            skill: "GraphQL",
            required: "Preferred",
            yourLevel: "None",
            gap: "Major Gap",
            resources: [
              { name: "GraphQL Official Tutorial", type: "Tutorial", url: "https://graphql.org" },
              { name: "Apollo GraphQL Course", type: "Course", url: "https://odyssey.apollographql.com" },
            ],
          },
          {
            skill: "Docker",
            required: "Required",
            yourLevel: "Intermediate",
            gap: "Minor Gap",
            resources: [
              { name: "Docker Deep Dive", type: "Book", url: "https://www.amazon.com" },
            ],
          },
          {
            skill: "CI/CD",
            required: "Preferred",
            yourLevel: "Beginner",
            gap: "Minor Gap",
            resources: [
              { name: "GitHub Actions Tutorial", type: "Tutorial", url: "https://github.com" },
            ],
          },
        ],
        recommendations: [
          "Focus on Kubernetes first - it's a required skill with your biggest gap",
          "Your AWS knowledge is close - consider getting certified to stand out",
          "GraphQL is becoming industry standard - start with basics",
          "Your React and TypeScript skills are strong - highlight these in your CV",
          "Consider building a project using Docker + K8s to demonstrate learning",
        ],
        learningPath: [
          { skill: "Kubernetes", priority: 1, estimatedTime: "4-6 weeks" },
          { skill: "AWS (Advanced)", priority: 2, estimatedTime: "2-3 weeks" },
          { skill: "Docker (Advanced)", priority: 3, estimatedTime: "1-2 weeks" },
          { skill: "GraphQL", priority: 4, estimatedTime: "2-3 weeks" },
          { skill: "CI/CD Pipelines", priority: 5, estimatedTime: "1-2 weeks" },
        ],
      };

      setResult(mockResult);
      toast({
        title: "Analysis complete!",
        description: `Your skill match score: ${mockResult.matchScore}%`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getGapIcon = (gap: string) => {
    switch (gap) {
      case "No Gap":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "Minor Gap":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "Major Gap":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getGapColor = (gap: string) => {
    switch (gap) {
      case "No Gap":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Minor Gap":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Major Gap":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            Skills Gap Analyzer
          </h2>
          <p className="text-muted-foreground">Identify skill gaps and get a personalized learning path</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Paste the job description you're targeting</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>Add your current skills (we'll also extract from your CV)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {userSkills.length === 0 && (
                  <p className="text-sm text-muted-foreground">No skills added yet. Add your skills above.</p>
                )}
              </div>
              <Button onClick={handleAnalyze} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="mr-2 h-4 w-4" />
                    Analyze Skills Gap
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {result && (
            <>
              {/* Match Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Skill Match Score
                    <span className={`text-3xl font-bold ${result.matchScore >= 80 ? "text-green-600" : result.matchScore >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                      {result.matchScore}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-4 rounded-full transition-all ${result.matchScore >= 80 ? "bg-green-600" : result.matchScore >= 60 ? "bg-yellow-600" : "bg-red-600"}`}
                      style={{ width: `${result.matchScore}%` }}
                    />
                  </div>
                  <div className="mt-4">
                    <Label className="text-xs text-muted-foreground">SKILLS YOU HAVE</Label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {result.skillsMatched.map((skill) => (
                        <span key={skill} className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="mr-1 inline h-3 w-3" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Gaps Identified</CardTitle>
                  <CardDescription>Skills you need to develop for this role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.skillGaps.map((gap, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getGapIcon(gap.gap)}
                            <span className="font-medium">{gap.skill}</span>
                          </div>
                          <span className={`rounded-full px-2 py-1 text-xs ${getGapColor(gap.gap)}`}>
                            {gap.gap}
                          </span>
                        </div>
                        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                          <span>Required: <strong>{gap.required}</strong></span>
                          <span>Your Level: <strong>{gap.yourLevel}</strong></span>
                        </div>
                        <div className="mt-3">
                          <Label className="text-xs text-muted-foreground">LEARNING RESOURCES</Label>
                          <div className="mt-1 space-y-1">
                            {gap.resources.map((resource, i) => (
                              <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                              >
                                <BookOpen className="h-3 w-3" />
                                {resource.name} ({resource.type})
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Path */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Learning Path</CardTitle>
                  <CardDescription>Prioritized skills to learn based on impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.learningPath.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {item.priority}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.skill}</p>
                          <p className="text-sm text-muted-foreground">Estimated: {item.estimatedTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Sparkles className="mt-0.5 h-4 w-4 text-yellow-500 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Paste a job description and add your skills to get a personalized gap analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
