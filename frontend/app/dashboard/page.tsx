"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  PenTool,
  TrendingUp,
  Target,
  Calendar,
  Bell,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  Award
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  Legend,
} from "recharts";

// Application funnel data
const funnelData = [
  { name: "Applied", value: 45, fill: "#3b82f6" },
  { name: "Screening", value: 28, fill: "#8b5cf6" },
  { name: "Interview", value: 12, fill: "#f59e0b" },
  { name: "Final Round", value: 5, fill: "#10b981" },
  { name: "Offer", value: 2, fill: "#22c55e" },
];

// Weekly application trend
const weeklyTrendData = [
  { week: "Week 1", applications: 8, interviews: 2, responses: 3 },
  { week: "Week 2", applications: 12, interviews: 3, responses: 5 },
  { week: "Week 3", applications: 10, interviews: 4, responses: 4 },
  { week: "Week 4", applications: 15, interviews: 5, responses: 7 },
];

// Application status distribution
const statusDistribution = [
  { name: "Applied", value: 45, color: "#3b82f6" },
  { name: "Interview", value: 12, color: "#f59e0b" },
  { name: "Offer", value: 2, color: "#22c55e" },
  { name: "Rejected", value: 15, color: "#ef4444" },
  { name: "Withdrawn", value: 3, color: "#6b7280" },
];

// ATS Score trend
const atsScoreTrend = [
  { version: "v1", score: 62 },
  { version: "v2", score: 71 },
  { version: "v3", score: 78 },
  { version: "v4", score: 85 },
  { version: "v5", score: 92 },
];

// Response rate by day
const responseRateData = [
  { day: "Mon", rate: 12 },
  { day: "Tue", rate: 18 },
  { day: "Wed", rate: 15 },
  { day: "Thu", rate: 22 },
  { day: "Fri", rate: 8 },
  { day: "Sat", rate: 3 },
  { day: "Sun", rate: 2 },
];

// Upcoming reminders
const upcomingReminders = [
  { id: 1, type: "follow-up", company: "Google", position: "Software Engineer", date: "2025-01-25", daysLeft: 2 },
  { id: 2, type: "interview", company: "Meta", position: "Frontend Developer", date: "2025-01-26", daysLeft: 3 },
  { id: 3, type: "follow-up", company: "Amazon", position: "Full Stack Developer", date: "2025-01-28", daysLeft: 5 },
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Calculate metrics
  const totalApplications = 45;
  const interviewRate = ((12 / 45) * 100).toFixed(1);
  const offerRate = ((2 / 45) * 100).toFixed(1);
  const avgResponseTime = 5.2;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your job search overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedPeriod("week")}>
            Week
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedPeriod("month")}>
            Month
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedPeriod("year")}>
            Year
          </Button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last {selectedPeriod}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> above average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offer Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offerRate}%</div>
            <p className="text-xs text-muted-foreground">
              2 offers received this {selectedPeriod}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime} days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-1.3 days</span> faster
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Application Funnel */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Application Funnel</CardTitle>
            <CardDescription>Your job search pipeline this {selectedPeriod}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution Pie Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current application statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Weekly Trend */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity Trend</CardTitle>
            <CardDescription>Applications, interviews, and responses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  stackId="2"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="responses"
                  stackId="3"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ATS Score Improvement */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>ATS Score Improvement</CardTitle>
            <CardDescription>Your CV optimization progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={atsScoreTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="version" />
                <YAxis domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: "#22c55e", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-green-600">92</span>
              <span className="text-muted-foreground">/100 Current ATS Score</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Upcoming Reminders
            </CardTitle>
            <CardDescription>Don't miss these important follow-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${
                    reminder.type === "interview" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {reminder.type === "interview" ? <Calendar className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{reminder.position}</p>
                    <p className="text-xs text-muted-foreground">{reminder.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600">{reminder.daysLeft} days</p>
                    <p className="text-xs text-muted-foreground">{reminder.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href="/dashboard/applications">View All Reminders</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your latest job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${getStatusBg(app.status)}`}>
                    {getStatusIcon(app.status)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{app.position}</p>
                    <p className="text-xs text-muted-foreground">{app.company}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href="/dashboard/applications">View All Applications</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/dashboard/cv" className="flex items-center justify-between rounded-md border p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Optimize CV</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link href="/dashboard/cover-letters" className="flex items-center justify-between rounded-md border p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Generate Cover Letter</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link href="/dashboard/applications" className="flex items-center justify-between rounded-md border p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Add Application</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link href="/dashboard/interview" className="flex items-center justify-between rounded-md border p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Practice Interview</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link href="/dashboard/linkedin" className="flex items-center justify-between rounded-md border p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-700" />
                  <span className="text-sm">Optimize LinkedIn</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Best Days to Apply</CardTitle>
          <CardDescription>Response rates by day of week based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={responseRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))'
                }}
                formatter={(value) => [`${value}%`, "Response Rate"]}
              />
              <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            💡 Pro tip: Thursday has the highest response rate (22%)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

const recentApplications = [
  { id: 1, position: "Senior Software Engineer", company: "Tech Corp", status: "Interview" },
  { id: 2, position: "Full Stack Developer", company: "StartupXYZ", status: "Applied" },
  { id: 3, position: "Frontend Engineer", company: "BigTech Inc", status: "Applied" },
  { id: 4, position: "Backend Developer", company: "Cloud Services", status: "Rejected" },
  { id: 5, position: "DevOps Engineer", company: "InfraTech", status: "Offer" },
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "interview":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "applied":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "offer":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}

function getStatusBg(status: string) {
  switch (status.toLowerCase()) {
    case "interview":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400";
    case "applied":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400";
    case "rejected":
      return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400";
    case "offer":
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case "interview":
      return <Calendar className="h-4 w-4" />;
    case "applied":
      return <Clock className="h-4 w-4" />;
    case "rejected":
      return <XCircle className="h-4 w-4" />;
    case "offer":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Briefcase className="h-4 w-4" />;
  }
}
