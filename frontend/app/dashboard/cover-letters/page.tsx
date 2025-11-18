"use client";

import { useState } from "react";
import { FileText, Sparkles, Download, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function CoverLettersPage() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("professional");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!company || !position || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate AI generation (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const letter = generateMockLetter(company, position, tone);
      setGeneratedLetter(letter);

      toast({
        title: "Cover letter generated!",
        description: "Your personalized cover letter is ready.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockLetter = (company: string, position: string, tone: string) => {
    const tonePrefix = {
      professional: "Dear Hiring Manager,",
      creative: "Hello there!",
      casual: "Hi!",
    }[tone];

    return `${tonePrefix}

I am writing to express my strong interest in the ${position} position at ${company}. With my extensive experience in software development and proven track record of delivering high-quality solutions, I am confident in my ability to contribute significantly to your team.

Throughout my career, I have consistently demonstrated my ability to tackle complex technical challenges while maintaining a strong focus on user experience and business objectives. My expertise in modern web technologies, combined with my passion for continuous learning, aligns perfectly with the requirements outlined in your job description.

What particularly excites me about ${company} is your commitment to innovation and excellence in the industry. I am impressed by your recent projects and the positive impact they've had on users. I would be thrilled to bring my skills in full-stack development, problem-solving, and team collaboration to contribute to your continued success.

Some key highlights of my qualifications include:
• 5+ years of experience in software development
• Proficiency in modern frameworks and technologies
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities
• Track record of delivering projects on time and exceeding expectations

I am particularly drawn to this opportunity because it aligns with my career goals and passion for creating innovative solutions. I am confident that my technical expertise, combined with my enthusiasm and dedication, would make me a valuable addition to your team.

I would welcome the opportunity to discuss how my experience and skills can contribute to ${company}'s success. Thank you for considering my application. I look forward to the possibility of speaking with you soon.

Best regards,
[Your Name]`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Cover letter copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cover Letter Generator</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Provide job information to generate a tailored cover letter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position Title *</Label>
              <Input
                id="position"
                placeholder="e.g., Senior Software Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description *</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !company || !position || !jobDescription}
              className="w-full"
            >
              {loading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Cover Letter</CardTitle>
            <CardDescription>
              AI-crafted cover letter tailored to your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedLetter ? (
              <>
                <Textarea
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  className="min-h-[400px] text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" className="flex-1">
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">Tips for Your Cover Letter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Review and personalize the generated content</li>
                      <li>• Add specific examples from your experience</li>
                      <li>• Proofread for any errors or inconsistencies</li>
                      <li>• Keep it concise (aim for one page)</li>
                      <li>• Show enthusiasm for the role and company</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground max-w-sm">
                  Fill in the job details and click &quot;Generate&quot; to create your personalized cover letter
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Cover Letters */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cover Letters</CardTitle>
          <CardDescription>Your previously generated cover letters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { company: "Tech Corp", position: "Senior Software Engineer", date: "2 days ago" },
              { company: "StartupXYZ", position: "Full Stack Developer", date: "5 days ago" },
              { company: "BigTech Inc", position: "Frontend Engineer", date: "1 week ago" },
            ].map((letter, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {letter.position} at {letter.company}
                    </p>
                    <p className="text-xs text-muted-foreground">Generated {letter.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
