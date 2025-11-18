"use client";

import { useState } from "react";
import { Lightbulb, Play, RotateCcw, CheckCircle2, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  tips?: string;
  answer?: string;
}

export default function InterviewPrepPage() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!company || !position) {
      toast({
        title: "Missing information",
        description: "Please provide company and position.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate AI generation (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockQuestions = generateMockQuestions(position);
      setQuestions(mockQuestions);
      setCurrentQuestion(0);

      toast({
        title: "Questions generated!",
        description: `Generated ${mockQuestions.length} interview questions.`,
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

  const generateMockQuestions = (position: string): Question[] => {
    return [
      {
        id: "1",
        question: "Tell me about yourself and your background.",
        category: "General",
        difficulty: "Easy",
        tips: "Focus on your professional journey, highlighting relevant experience for this role. Keep it concise (2-3 minutes).",
      },
      {
        id: "2",
        question: "What interests you about this position and our company?",
        category: "Motivation",
        difficulty: "Easy",
        tips: "Research the company beforehand. Mention specific projects, values, or technologies that align with your interests.",
      },
      {
        id: "3",
        question: "Describe a challenging project you worked on and how you overcame obstacles.",
        category: "Behavioral",
        difficulty: "Medium",
        tips: "Use the STAR method (Situation, Task, Action, Result). Be specific about your role and the impact.",
      },
      {
        id: "4",
        question: `What are the key technical skills required for a ${position}?`,
        category: "Technical",
        difficulty: "Medium",
        tips: "Demonstrate your understanding of the role and how your skills align. Be honest about areas you're learning.",
      },
      {
        id: "5",
        question: "How do you handle conflicts with team members?",
        category: "Behavioral",
        difficulty: "Medium",
        tips: "Show emotional intelligence and communication skills. Focus on resolution and learning.",
      },
      {
        id: "6",
        question: "Where do you see yourself in 5 years?",
        category: "Career Goals",
        difficulty: "Easy",
        tips: "Show ambition but be realistic. Align your goals with potential growth within the company.",
      },
      {
        id: "7",
        question: "Describe your approach to learning new technologies.",
        category: "Technical",
        difficulty: "Easy",
        tips: "Mention specific resources, projects, or methods you use. Show continuous learning mindset.",
      },
      {
        id: "8",
        question: "Tell me about a time you failed and what you learned.",
        category: "Behavioral",
        difficulty: "Hard",
        tips: "Choose a real failure but focus on growth and lessons learned. Show self-awareness.",
      },
      {
        id: "9",
        question: "How do you prioritize tasks when managing multiple projects?",
        category: "Problem Solving",
        difficulty: "Medium",
        tips: "Describe your organizational system and decision-making process. Mention specific tools if relevant.",
      },
      {
        id: "10",
        question: "Do you have any questions for us?",
        category: "General",
        difficulty: "Easy",
        tips: "Always have 2-3 thoughtful questions prepared. Ask about team culture, growth opportunities, or current projects.",
      },
    ];
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setUserAnswer("");
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Interview Preparation</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Setup Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Setup Interview</CardTitle>
            <CardDescription>
              Generate interview questions based on the role
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                placeholder="e.g., Software Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-desc">Job Description (Optional)</Label>
              <Textarea
                id="job-desc"
                placeholder="Paste job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !company || !position}
              className="w-full"
            >
              {loading ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  Generate Questions
                </>
              )}
            </Button>

            {questions.length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Practice Progress</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="font-medium">{questions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current</span>
                    <span className="font-medium">{currentQuestion + 1}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Practice Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Practice Questions</CardTitle>
            <CardDescription>
              Prepare your answers and review tips
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.length > 0 && currentQ ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(currentQ.difficulty)}`}>
                          {currentQ.difficulty}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                          {currentQ.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-lg font-medium">{currentQ.question}</p>
                  </div>

                  {currentQ.tips && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          Tips for answering
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-900">{currentQ.tips}</p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="answer">Your Answer (Practice)</Label>
                    <Textarea
                      id="answer"
                      placeholder="Type or speak your answer here..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestion === 0}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === questions.length - 1}
                      className="flex-1"
                    >
                      Next Question
                    </Button>
                  </div>
                </div>

                {/* Questions Overview */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">All Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {questions.map((q, index) => (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-full text-left p-2 rounded text-sm hover:bg-muted ${
                            index === currentQuestion ? "bg-muted font-medium" : ""
                          }`}
                        >
                          {index + 1}. {q.question}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Target className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground max-w-sm">
                  Generate interview questions to start practicing
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Company Research */}
      <Card>
        <CardHeader>
          <CardTitle>Company Research</CardTitle>
          <CardDescription>Key information to prepare for your interview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">What to Research:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Company mission and values</li>
                <li>• Recent news and developments</li>
                <li>• Products and services</li>
                <li>• Company culture and work environment</li>
                <li>• Key competitors</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">STAR Method:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Situation:</strong> Set the context</li>
                <li>• <strong>Task:</strong> Describe your responsibility</li>
                <li>• <strong>Action:</strong> Explain what you did</li>
                <li>• <strong>Result:</strong> Share the outcome</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
