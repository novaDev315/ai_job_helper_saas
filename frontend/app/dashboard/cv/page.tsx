"use client";

import { useState } from "react";
import { Upload, FileText, Sparkles, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function CVOptimizerPage() {
  const [cvContent, setCvContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [optimizedCV, setOptimizedCV] = useState("");
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a .txt file for now. PDF support coming soon!",
        variant: "destructive",
      });
      return;
    }

    const text = await file.text();
    setCvContent(text);
    toast({
      title: "CV uploaded",
      description: "Your CV has been loaded successfully.",
    });
  };

  const handleOptimize = async () => {
    if (!cvContent) {
      toast({
        title: "No CV content",
        description: "Please upload or paste your CV first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate AI optimization (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock optimization
      const optimized = `OPTIMIZED VERSION:\n\n${cvContent}\n\n[Enhanced with keywords, improved formatting, and ATS-friendly structure]`;
      setOptimizedCV(optimized);

      // Calculate ATS score
      const score = calculateATSScore(cvContent);
      setAtsScore(score);

      toast({
        title: "Optimization complete!",
        description: `Your CV has been optimized. ATS Score: ${score}/100`,
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

  const calculateATSScore = (content: string): number => {
    const keywords = ["experience", "skills", "achievement", "project", "education"];
    let score = 50;

    keywords.forEach((keyword) => {
      if (content.toLowerCase().includes(keyword)) score += 5;
    });

    if (/\d+%|\d+\+/.test(content)) score += 15;
    if (content.length > 500 && content.length < 5000) score += 10;

    return Math.min(Math.max(score, 0), 100);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">CV Optimizer</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Your CV</CardTitle>
            <CardDescription>
              Upload your CV or paste the content below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="cv-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">TXT, PDF, or DOCX (max 10MB)</p>
                </div>
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".txt,.pdf,.docx"
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv-content">Or paste your CV content</Label>
              <Textarea
                id="cv-content"
                placeholder="Paste your CV text here..."
                value={cvContent}
                onChange={(e) => setCvContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description (Optional)</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description to tailor your CV..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleOptimize}
              disabled={loading || !cvContent}
              className="w-full"
            >
              {loading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Optimize CV
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Optimized CV</CardTitle>
            <CardDescription>
              AI-enhanced version with ATS improvements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {atsScore !== null && (
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">ATS Compatibility Score</span>
                  <span className="text-2xl font-bold text-primary">{atsScore}/100</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
              </div>
            )}

            {optimizedCV ? (
              <div className="space-y-4">
                <Textarea
                  value={optimizedCV}
                  readOnly
                  className="min-h-[300px] font-mono text-xs"
                />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Save Version
                  </Button>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">Optimization Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Added industry-relevant keywords</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Improved formatting for ATS systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Enhanced action verbs and quantifiable metrics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Structured sections for better readability</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Upload your CV and click &quot;Optimize&quot; to see results
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent CVs */}
      <Card>
        <CardHeader>
          <CardTitle>Your CV Versions</CardTitle>
          <CardDescription>Previous CV versions and optimizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((version) => (
              <div
                key={version}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Software Engineer CV v{version}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated 2 days ago · ATS Score: {85 + version * 2}/100
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
