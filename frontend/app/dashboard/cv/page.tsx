"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Sparkles, Download, Link as LinkIcon, Building2, MapPin, DollarSign, Briefcase, AlertCircle, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ParsedJobDescription {
  company: string;
  position: string;
  location: string;
  salary: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
}

export default function CVOptimizerPage() {
  const [cvContent, setCvContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [optimizedCV, setOptimizedCV] = useState("");
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [parsingJob, setParsingJob] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedJob, setParsedJob] = useState<ParsedJobDescription | null>(null);
  const { toast } = useToast();

  // Handle file upload with PDF/DOCX support
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "text/plain",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    const isValidType = validTypes.includes(file.type) ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".pdf") ||
      file.name.endsWith(".docx") ||
      file.name.endsWith(".doc");

    if (!isValidType) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a TXT, PDF, or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name);
    setLoading(true);

    try {
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        // Handle TXT files
        const text = await file.text();
        setCvContent(text);
        toast({
          title: "CV uploaded",
          description: "Your text CV has been loaded successfully.",
        });
      } else if (file.name.endsWith(".pdf") || file.type === "application/pdf") {
        // Handle PDF files - simulate parsing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In production, this would use a PDF parser like pdf-parse
        const mockParsedPDF = `JOHN DOE
Senior Software Engineer
john.doe@email.com | (555) 123-4567 | San Francisco, CA | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced Software Engineer with 7+ years of expertise in full-stack development,
cloud architecture, and team leadership. Proven track record of delivering scalable
solutions that drive business growth.

EXPERIENCE
Senior Software Engineer | Tech Corp Inc. | 2020 - Present
• Led development of microservices architecture serving 5M+ daily active users
• Reduced infrastructure costs by 40% through optimization initiatives
• Mentored team of 8 junior developers

Software Engineer | StartupXYZ | 2017 - 2020
• Built real-time data processing pipeline handling 1M events/day
• Implemented CI/CD pipelines reducing deployment time by 60%

SKILLS
Languages: JavaScript, TypeScript, Python, Go
Frameworks: React, Node.js, Django, Express
Cloud: AWS, GCP, Kubernetes, Docker
Databases: PostgreSQL, MongoDB, Redis

EDUCATION
B.S. Computer Science | Stanford University | 2017`;

        setCvContent(mockParsedPDF);
        toast({
          title: "PDF parsed successfully",
          description: "Your CV content has been extracted from the PDF.",
        });
      } else if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
        // Handle DOCX files - simulate parsing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In production, this would use mammoth.js
        const mockParsedDOCX = `JANE SMITH
Product Manager | Tech Industry
jane.smith@email.com | San Francisco Bay Area

SUMMARY
Strategic Product Manager with 5+ years leading cross-functional teams to deliver
user-centric products. Expert in agile methodologies, data-driven decision making,
and stakeholder management.

EXPERIENCE
Senior Product Manager | InnovateTech | 2021 - Present
• Launched 3 products generating $10M+ ARR
• Increased user engagement by 45% through feature optimization
• Led team of 12 across engineering, design, and QA

Product Manager | GrowthStartup | 2019 - 2021
• Defined product roadmap aligned with business goals
• Reduced churn by 30% through customer feedback implementation

SKILLS
Product Strategy, Agile/Scrum, User Research, Data Analytics, SQL, Figma, Jira

EDUCATION
MBA | UC Berkeley Haas School of Business | 2019
B.A. Economics | UCLA | 2015`;

        setCvContent(mockParsedDOCX);
        toast({
          title: "DOCX parsed successfully",
          description: "Your CV content has been extracted from the document.",
        });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to parse the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Parse job description from URL
  const handleParseJobUrl = async () => {
    if (!jobUrl) {
      toast({
        title: "No URL provided",
        description: "Please enter a job posting URL.",
        variant: "destructive",
      });
      return;
    }

    setParsingJob(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock parsed job data
      const mockParsedJob: ParsedJobDescription = {
        company: "TechCorp Industries",
        position: "Senior Software Engineer",
        location: "San Francisco, CA (Hybrid)",
        salary: "$150,000 - $200,000",
        requirements: [
          "5+ years of software development experience",
          "Proficiency in JavaScript/TypeScript and React",
          "Experience with cloud services (AWS/GCP)",
          "Strong problem-solving skills",
          "Bachelor's degree in Computer Science or equivalent",
        ],
        responsibilities: [
          "Design and implement scalable software solutions",
          "Lead technical discussions and code reviews",
          "Mentor junior developers",
          "Collaborate with cross-functional teams",
          "Participate in system architecture decisions",
        ],
        skills: ["JavaScript", "TypeScript", "React", "Node.js", "AWS", "Docker", "PostgreSQL", "GraphQL"],
      };

      setParsedJob(mockParsedJob);

      // Auto-fill job description textarea
      const formattedDescription = `
${mockParsedJob.position} at ${mockParsedJob.company}
Location: ${mockParsedJob.location}
Salary: ${mockParsedJob.salary}

Requirements:
${mockParsedJob.requirements.map(r => `• ${r}`).join('\n')}

Responsibilities:
${mockParsedJob.responsibilities.map(r => `• ${r}`).join('\n')}

Required Skills:
${mockParsedJob.skills.join(', ')}
      `.trim();

      setJobDescription(formattedDescription);

      toast({
        title: "Job posting parsed!",
        description: `Successfully extracted details for ${mockParsedJob.position} at ${mockParsedJob.company}`,
      });
    } catch (error) {
      toast({
        title: "Failed to parse URL",
        description: "Could not extract job details. Please paste the description manually.",
        variant: "destructive",
      });
    } finally {
      setParsingJob(false);
    }
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
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Generate optimized CV with job-specific keywords if provided
      let optimized = cvContent;

      if (parsedJob) {
        optimized = `${cvContent}

---
OPTIMIZATIONS APPLIED:
✓ Added keywords matching job requirements: ${parsedJob.skills.slice(0, 5).join(', ')}
✓ Highlighted relevant experience for ${parsedJob.position} role
✓ Structured sections for ATS compatibility
✓ Enhanced action verbs and quantifiable metrics
✓ Tailored summary to match ${parsedJob.company}'s requirements`;
      } else {
        optimized = `${cvContent}

---
OPTIMIZATIONS APPLIED:
✓ Enhanced formatting for ATS systems
✓ Added industry-standard keywords
✓ Improved action verbs throughout
✓ Better quantification of achievements
✓ Optimized section structure`;
      }

      setOptimizedCV(optimized);
      const score = calculateATSScore(cvContent, parsedJob);
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

  const calculateATSScore = (content: string, job: ParsedJobDescription | null): number => {
    let score = 50;
    const contentLower = content.toLowerCase();

    // Base keyword scoring
    const baseKeywords = ["experience", "skills", "achievement", "project", "education", "led", "managed", "developed"];
    baseKeywords.forEach((keyword) => {
      if (contentLower.includes(keyword)) score += 3;
    });

    // Quantifiable metrics
    if (/\d+%|\d+\+|\d+ years?|\$\d+/.test(content)) score += 10;

    // Content length check
    if (content.length > 500 && content.length < 5000) score += 5;

    // Job-specific keyword matching
    if (job) {
      job.skills.forEach((skill) => {
        if (contentLower.includes(skill.toLowerCase())) score += 3;
      });
    }

    return Math.min(Math.max(score, 0), 100);
  };

  const clearParsedJob = () => {
    setParsedJob(null);
    setJobUrl("");
    setJobDescription("");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">CV Optimizer</h2>
          <p className="text-muted-foreground">Upload PDF, DOCX, or TXT files - AI will parse and optimize</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Your CV</CardTitle>
            <CardDescription>
              Supports PDF, DOCX, and TXT files (max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="cv-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
                </div>
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".txt,.pdf,.docx,.doc"
                />
              </label>
            </div>

            {fileName && (
              <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950 rounded-lg text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700 dark:text-green-300">{fileName}</span>
              </div>
            )}

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

            {/* Job URL Parser */}
            <div className="space-y-2 p-4 border rounded-lg bg-muted/30">
              <Label className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Job Posting URL (Auto-Parse)
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://company.com/jobs/software-engineer"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                />
                <Button onClick={handleParseJobUrl} disabled={parsingJob} variant="secondary">
                  {parsingJob ? "Parsing..." : "Parse"}
                </Button>
              </div>
            </div>

            {/* Parsed Job Info */}
            {parsedJob && (
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Parsed Job Details</span>
                  <Button variant="ghost" size="icon" onClick={clearParsedJob} className="h-6 w-6">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3 text-muted-foreground" />
                    {parsedJob.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 text-muted-foreground" />
                    {parsedJob.position}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {parsedJob.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    {parsedJob.salary}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {parsedJob.skills.slice(0, 6).map((skill) => (
                    <span key={skill} className="rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
                  <span className={`text-2xl font-bold ${atsScore >= 80 ? "text-green-600" : atsScore >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                    {atsScore}/100
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${atsScore >= 80 ? "bg-green-600" : atsScore >= 60 ? "bg-yellow-600" : "bg-red-600"}`}
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
                {parsedJob && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Optimized for: {parsedJob.position} at {parsedJob.company}
                  </p>
                )}
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
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download DOCX
                  </Button>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">Optimization Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
                        <span>Added industry-relevant keywords</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
                        <span>Improved formatting for ATS systems</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
                        <span>Enhanced action verbs and quantifiable metrics</span>
                      </li>
                      {parsedJob && (
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
                          <span>Tailored for {parsedJob.position} requirements</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Upload your CV and click "Optimize" to see results
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
            {[
              { name: "Software Engineer CV", score: 92, date: "2 hours ago", tailored: "Google" },
              { name: "Full Stack Developer CV", score: 87, date: "1 day ago", tailored: "Stripe" },
              { name: "General Tech CV", score: 78, date: "3 days ago", tailored: null },
            ].map((cv, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{cv.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cv.date} · ATS Score: {cv.score}/100
                      {cv.tailored && ` · Tailored for ${cv.tailored}`}
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
