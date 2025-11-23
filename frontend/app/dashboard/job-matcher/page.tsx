"use client";

import { useState } from "react";
import { Search, Sparkles, MapPin, DollarSign, Building2, Clock, ExternalLink, Heart, HeartOff, Filter, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  postedDate: string;
  type: string;
  remote: boolean;
  description: string;
  skills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  companyInfo: {
    size: string;
    industry: string;
    rating: number;
  };
}

export default function JobMatcherPage() {
  const [targetRole, setTargetRole] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [remote, setRemote] = useState("any");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!targetRole) {
      toast({
        title: "Missing role",
        description: "Please enter a target role to search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock job matches based on user's CV
      const mockJobs: JobMatch[] = [
        {
          id: "1",
          title: "Senior Software Engineer",
          company: "Google",
          location: "Mountain View, CA",
          salary: "$180K - $250K",
          matchScore: 95,
          postedDate: "2 days ago",
          type: "Full-time",
          remote: true,
          description: "Join our team to build scalable systems that impact billions of users worldwide...",
          skills: ["React", "TypeScript", "Node.js", "Kubernetes", "GCP"],
          matchedSkills: ["React", "TypeScript", "Node.js"],
          missingSkills: ["Kubernetes", "GCP"],
          companyInfo: { size: "100,000+", industry: "Technology", rating: 4.5 },
        },
        {
          id: "2",
          title: "Full Stack Developer",
          company: "Stripe",
          location: "San Francisco, CA",
          salary: "$160K - $220K",
          matchScore: 91,
          postedDate: "1 day ago",
          type: "Full-time",
          remote: true,
          description: "Build the economic infrastructure for the internet...",
          skills: ["React", "Ruby", "PostgreSQL", "AWS"],
          matchedSkills: ["React", "PostgreSQL"],
          missingSkills: ["Ruby"],
          companyInfo: { size: "5,000+", industry: "Fintech", rating: 4.7 },
        },
        {
          id: "3",
          title: "Frontend Engineer",
          company: "Airbnb",
          location: "Remote",
          salary: "$150K - $200K",
          matchScore: 88,
          postedDate: "3 days ago",
          type: "Full-time",
          remote: true,
          description: "Create magical experiences for travelers around the world...",
          skills: ["React", "TypeScript", "GraphQL", "Testing"],
          matchedSkills: ["React", "TypeScript", "GraphQL"],
          missingSkills: ["Testing"],
          companyInfo: { size: "10,000+", industry: "Travel", rating: 4.3 },
        },
        {
          id: "4",
          title: "Software Engineer II",
          company: "Microsoft",
          location: "Seattle, WA",
          salary: "$140K - $190K",
          matchScore: 85,
          postedDate: "5 days ago",
          type: "Full-time",
          remote: false,
          description: "Empower every person and organization on the planet...",
          skills: ["C#", ".NET", "Azure", "React"],
          matchedSkills: ["React"],
          missingSkills: ["C#", ".NET", "Azure"],
          companyInfo: { size: "200,000+", industry: "Technology", rating: 4.2 },
        },
        {
          id: "5",
          title: "Backend Engineer",
          company: "Notion",
          location: "San Francisco, CA",
          salary: "$170K - $230K",
          matchScore: 82,
          postedDate: "1 week ago",
          type: "Full-time",
          remote: true,
          description: "Build tools that make work more productive...",
          skills: ["Node.js", "PostgreSQL", "Redis", "Kotlin"],
          matchedSkills: ["Node.js", "PostgreSQL"],
          missingSkills: ["Redis", "Kotlin"],
          companyInfo: { size: "500+", industry: "Productivity", rating: 4.8 },
        },
      ];

      setJobs(mockJobs);
      toast({
        title: "Jobs found!",
        description: `Found ${mockJobs.length} jobs matching your profile.`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
      toast({ title: "Job removed from saved" });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast({ title: "Job saved!" });
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
    if (score >= 80) return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300";
    if (score >= 70) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
    return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Search className="h-8 w-8 text-blue-600" />
            AI Job Matcher
          </h2>
          <p className="text-muted-foreground">Find jobs that match your skills and experience</p>
        </div>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search Filters
          </CardTitle>
          <CardDescription>Customize your job search based on preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label>Target Role</Label>
              <Input
                placeholder="e.g., Software Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="e.g., San Francisco"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Min Salary</Label>
              <Input
                placeholder="e.g., 150000"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Remote</Label>
              <Select value={remote} onValueChange={setRemote}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find Matches
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Results */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{jobs.length} Jobs Found</h3>
            <p className="text-sm text-muted-foreground">Sorted by match score</p>
          </div>

          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                        {job.matchScore}% Match
                      </span>
                      {job.remote && (
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          Remote
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.postedDate}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                    {/* Skills Match */}
                    <div className="mt-4 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {job.matchedSkills.map((skill) => (
                          <span key={skill} className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
                            ✓ {skill}
                          </span>
                        ))}
                        {job.missingSkills.map((skill) => (
                          <span key={skill} className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                            Learn: {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{job.companyInfo.industry}</span>
                      <span>{job.companyInfo.size} employees</span>
                      <span>⭐ {job.companyInfo.rating}/5</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleSaveJob(job.id)}
                    >
                      {savedJobs.includes(job.id) ? (
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      ) : (
                        <HeartOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="flex-1">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Quick Apply
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {jobs.length === 0 && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Enter your preferences and click "Find Matches" to discover jobs that match your profile.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
