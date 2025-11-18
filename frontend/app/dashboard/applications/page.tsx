"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, ExternalLink, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type ApplicationStatus = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";

interface Application {
  id: string;
  company: string;
  position: string;
  location?: string;
  salary?: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
}

export default function ApplicationsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const { toast } = useToast();

  // Mock data
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      salary: "$150K - $180K",
      status: "INTERVIEW",
      appliedDate: "2025-01-10",
      notes: "Had initial phone screen, waiting for technical interview",
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      location: "Remote",
      salary: "$120K - $150K",
      status: "APPLIED",
      appliedDate: "2025-01-15",
      notes: "Applied through LinkedIn",
    },
    {
      id: "3",
      company: "BigTech Inc",
      position: "Frontend Engineer",
      location: "New York, NY",
      salary: "$140K - $170K",
      status: "APPLIED",
      appliedDate: "2025-01-18",
    },
    {
      id: "4",
      company: "Cloud Services",
      position: "Backend Developer",
      location: "Austin, TX",
      salary: "$130K - $160K",
      status: "REJECTED",
      appliedDate: "2025-01-05",
      notes: "Not selected for interview round",
    },
  ]);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    jobUrl: "",
    notes: "",
  });

  const handleAddApplication = () => {
    if (!formData.company || !formData.position) {
      toast({
        title: "Missing information",
        description: "Please fill in company and position fields.",
        variant: "destructive",
      });
      return;
    }

    const newApp: Application = {
      id: Date.now().toString(),
      company: formData.company,
      position: formData.position,
      location: formData.location,
      salary: formData.salary,
      status: "APPLIED",
      appliedDate: new Date().toISOString().split("T")[0],
      notes: formData.notes,
    };

    setApplications([newApp, ...applications]);
    setFormData({
      company: "",
      position: "",
      location: "",
      salary: "",
      jobUrl: "",
      notes: "",
    });
    setShowAddForm(false);

    toast({
      title: "Application added",
      description: "Your job application has been saved successfully.",
    });
  };

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );

    toast({
      title: "Status updated",
      description: "Application status has been changed.",
    });
  };

  const handleDelete = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id));
    toast({
      title: "Application deleted",
      description: "The application has been removed.",
    });
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "APPLIED").length,
    interview: applications.filter((a) => a.status === "INTERVIEW").length,
    offer: applications.filter((a) => a.status === "OFFER").length,
    rejected: applications.filter((a) => a.status === "REJECTED").length,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Job Applications</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Applied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.applied}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Interview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.interview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Offer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Application Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Application</CardTitle>
            <CardDescription>Track a new job application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  placeholder="Job title"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State or Remote"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $120K - $150K"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="jobUrl">Job URL</Label>
                <Input
                  id="jobUrl"
                  type="url"
                  placeholder="https://..."
                  value={formData.jobUrl}
                  onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this application..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddApplication}>Add Application</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="APPLIED">Applied</SelectItem>
            <SelectItem value="INTERVIEW">Interview</SelectItem>
            <SelectItem value="OFFER">Offer</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card key={app.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{app.position}</h3>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{app.company}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {app.location && <span>{app.location}</span>}
                    {app.salary && <span>{app.salary}</span>}
                    <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                  </div>
                  {app.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{app.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={app.status}
                    onValueChange={(value) =>
                      handleStatusChange(app.id, value as ApplicationStatus)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APPLIED">Applied</SelectItem>
                      <SelectItem value="INTERVIEW">Interview</SelectItem>
                      <SelectItem value="OFFER">Offer</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                      <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(app.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No applications found. Add your first application to get started!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const colors = {
    APPLIED: "bg-yellow-100 text-yellow-800",
    INTERVIEW: "bg-blue-100 text-blue-800",
    OFFER: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    WITHDRAWN: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
