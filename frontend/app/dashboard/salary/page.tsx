"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, MapPin, Building2, Sparkles, BarChart3, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface SalaryData {
  role: string;
  location: string;
  experience: string;
  median: number;
  p25: number;
  p75: number;
  p90: number;
  totalComp: number;
  base: number;
  bonus: number;
  stock: number;
  byCompany: { company: string; salary: number; totalComp: number }[];
  trend: { year: string; salary: number }[];
  comparison: { location: string; salary: number }[];
}

export default function SalaryInsightsPage() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SalaryData | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!role) {
      toast({
        title: "Missing role",
        description: "Please enter a job role to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock salary data
      const mockData: SalaryData = {
        role: role || "Software Engineer",
        location: location || "San Francisco, CA",
        experience: experience || "5 years",
        median: 175000,
        p25: 145000,
        p75: 210000,
        p90: 280000,
        totalComp: 245000,
        base: 175000,
        bonus: 25000,
        stock: 45000,
        byCompany: [
          { company: "Google", salary: 190000, totalComp: 320000 },
          { company: "Meta", salary: 185000, totalComp: 310000 },
          { company: "Apple", salary: 180000, totalComp: 290000 },
          { company: "Amazon", salary: 175000, totalComp: 280000 },
          { company: "Microsoft", salary: 170000, totalComp: 260000 },
          { company: "Netflix", salary: 250000, totalComp: 350000 },
          { company: "Stripe", salary: 195000, totalComp: 300000 },
          { company: "Airbnb", salary: 185000, totalComp: 285000 },
        ],
        trend: [
          { year: "2020", salary: 145000 },
          { year: "2021", salary: 155000 },
          { year: "2022", salary: 170000 },
          { year: "2023", salary: 175000 },
          { year: "2024", salary: 180000 },
          { year: "2025", salary: 185000 },
        ],
        comparison: [
          { location: "San Francisco", salary: 175000 },
          { location: "New York", salary: 165000 },
          { location: "Seattle", salary: 170000 },
          { location: "Austin", salary: 145000 },
          { location: "Denver", salary: 140000 },
          { location: "Remote", salary: 155000 },
        ],
      };

      setData(mockData);
      toast({
        title: "Analysis complete!",
        description: `Salary data for ${role} in ${location || "all locations"}.`,
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <DollarSign className="h-8 w-8 text-green-600" />
            Salary Insights
          </h2>
          <p className="text-muted-foreground">Get market salary data for your target role</p>
        </div>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>Search Salary Data</CardTitle>
          <CardDescription>Enter your target role and location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Job Role</Label>
              <Input
                placeholder="e.g., Software Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
              <Label>Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                  <SelectItem value="staff">Staff (8+ years)</SelectItem>
                  <SelectItem value="principal">Principal (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAnalyze} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Get Insights
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {data && (
        <>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Median Salary</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(data.median)}</div>
                <p className="text-xs text-muted-foreground">Base salary (50th percentile)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Compensation</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(data.totalComp)}</div>
                <p className="text-xs text-muted-foreground">Base + Bonus + Stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top 10% Earn</CardTitle>
                <ArrowUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(data.p90)}</div>
                <p className="text-xs text-muted-foreground">90th percentile</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">YoY Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+5.7%</div>
                <p className="text-xs text-muted-foreground">Salary increase trend</p>
              </CardContent>
            </Card>
          </div>

          {/* Compensation Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Compensation Breakdown</CardTitle>
              <CardDescription>Average total compensation components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground">Base Salary</p>
                  <p className="text-2xl font-bold">{formatCurrency(data.base)}</p>
                  <p className="text-xs text-muted-foreground">71% of total</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground">Annual Bonus</p>
                  <p className="text-2xl font-bold">{formatCurrency(data.bonus)}</p>
                  <p className="text-xs text-muted-foreground">10% of total</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground">Stock/Equity</p>
                  <p className="text-2xl font-bold">{formatCurrency(data.stock)}</p>
                  <p className="text-xs text-muted-foreground">19% of total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Salary by Company */}
            <Card>
              <CardHeader>
                <CardTitle>Salary by Company</CardTitle>
                <CardDescription>Top paying companies for this role</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.byCompany} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${value / 1000}K`} />
                    <YAxis dataKey="company" type="category" width={80} />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="totalComp" fill="#22c55e" name="Total Comp" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Salary Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Trend</CardTitle>
                <CardDescription>Historical salary growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="salary"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Location Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Salary by Location</CardTitle>
              <CardDescription>How salaries compare across different cities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.comparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Bar dataKey="salary" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Negotiation Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Negotiation Tips</CardTitle>
              <CardDescription>AI-powered salary negotiation advice</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span>Based on your experience level, aim for the 60-75th percentile ({formatCurrency(data.p75)}) as your target.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span>Don't forget to negotiate equity - at tech companies, stock can be 20-40% of total compensation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span>Signing bonuses are often negotiable and can add $20K-$50K to your first-year compensation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span>If the base salary is firm, negotiate for additional PTO, remote work flexibility, or faster equity vesting.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}

      {!data && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Enter a job role to get detailed salary insights and market data.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
