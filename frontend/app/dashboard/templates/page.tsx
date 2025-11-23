"use client";

import { useState } from "react";
import { FileStack, Download, Eye, Star, Sparkles, Check, Layout, Briefcase, Code, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  features: string[];
  atsScore: number;
  popular: boolean;
  premium: boolean;
  color: string;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Professional Classic",
    category: "Traditional",
    description: "Clean and professional design perfect for corporate roles",
    preview: "/templates/professional.png",
    features: ["ATS-optimized", "Clean sections", "Traditional layout", "Two-column option"],
    atsScore: 95,
    popular: true,
    premium: false,
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Modern Tech",
    category: "Technology",
    description: "Modern design tailored for tech industry positions",
    preview: "/templates/tech.png",
    features: ["Skills sidebar", "Project highlights", "GitHub integration", "Tech-focused"],
    atsScore: 92,
    popular: true,
    premium: false,
    color: "bg-purple-500",
  },
  {
    id: "3",
    name: "Creative Portfolio",
    category: "Creative",
    description: "Stand out with this creative design for design/marketing roles",
    preview: "/templates/creative.png",
    features: ["Portfolio section", "Visual skills", "Color customization", "Unique layout"],
    atsScore: 78,
    popular: false,
    premium: true,
    color: "bg-pink-500",
  },
  {
    id: "4",
    name: "Executive Leader",
    category: "Executive",
    description: "Sophisticated design for senior leadership positions",
    preview: "/templates/executive.png",
    features: ["Leadership focus", "Board-ready", "Achievement highlights", "Premium feel"],
    atsScore: 90,
    popular: false,
    premium: true,
    color: "bg-gray-800",
  },
  {
    id: "5",
    name: "Minimalist Clean",
    category: "Minimalist",
    description: "Simple and elegant design that lets your content shine",
    preview: "/templates/minimal.png",
    features: ["Maximum readability", "Simple layout", "Focus on content", "Timeless design"],
    atsScore: 98,
    popular: true,
    premium: false,
    color: "bg-slate-500",
  },
  {
    id: "6",
    name: "Academic Research",
    category: "Academic",
    description: "Designed for academic and research positions",
    preview: "/templates/academic.png",
    features: ["Publications section", "Research focus", "CV format", "Citations ready"],
    atsScore: 88,
    popular: false,
    premium: false,
    color: "bg-green-600",
  },
  {
    id: "7",
    name: "Startup Founder",
    category: "Entrepreneurial",
    description: "Perfect for founders and startup professionals",
    preview: "/templates/startup.png",
    features: ["Venture highlights", "Impact metrics", "Founder story", "Growth focus"],
    atsScore: 85,
    popular: false,
    premium: true,
    color: "bg-orange-500",
  },
  {
    id: "8",
    name: "Data Science Pro",
    category: "Technology",
    description: "Optimized for data science and ML positions",
    preview: "/templates/data.png",
    features: ["Technical skills", "Project metrics", "Certifications", "Tools section"],
    atsScore: 94,
    popular: true,
    premium: false,
    color: "bg-cyan-500",
  },
];

const categories = ["All", "Traditional", "Technology", "Creative", "Executive", "Minimalist", "Academic", "Entrepreneurial"];

export default function ResumeTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const { toast } = useToast();

  const filteredTemplates = selectedCategory === "All"
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  const handleUseTemplate = (template: Template) => {
    if (template.premium) {
      toast({
        title: "Premium Template",
        description: "Upgrade to Pro to access this template.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Template Selected!",
      description: `${template.name} is now ready to use. Go to CV Optimizer to apply it.`,
    });
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileStack className="h-8 w-8 text-indigo-600" />
            Resume Templates
          </h2>
          <p className="text-muted-foreground">Choose from professionally designed ATS-optimized templates</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">Professional designs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ATS Optimized</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">All templates pass ATS</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Templates</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.filter(t => !t.premium).length}</div>
            <p className="text-xs text-muted-foreground">Available now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Minimalist</div>
            <p className="text-xs text-muted-foreground">98% ATS score</p>
          </CardContent>
        </Card>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Template Preview */}
            <div className={`h-48 ${template.color} relative`}>
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 m-4 rounded shadow-sm p-4">
                <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="h-2 w-12 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded mb-0.5" />
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div>
                    <div className="h-2 w-12 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded mb-0.5" />
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
              {template.popular && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3" /> Popular
                </div>
              )}
              {template.premium && (
                <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  Premium
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <span className={`text-sm font-bold ${template.atsScore >= 90 ? "text-green-600" : "text-yellow-600"}`}>
                  {template.atsScore}% ATS
                </span>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handlePreview(template)}
                >
                  <Eye className="mr-1 h-4 w-4" /> Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleUseTemplate(template)}
                  disabled={template.premium}
                >
                  {template.premium ? "Upgrade" : "Use"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedTemplate(null)}>
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedTemplate.name}</CardTitle>
                  <CardDescription>{selectedTemplate.description}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedTemplate(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Large Preview */}
              <div className={`h-96 ${selectedTemplate.color} rounded-lg relative`}>
                <div className="absolute inset-0 bg-white dark:bg-gray-900 m-6 rounded-lg shadow-lg p-8">
                  <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-4" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-3" />
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                      </div>
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-3" />
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedTemplate.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ATS Score */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${selectedTemplate.atsScore >= 90 ? "text-green-600" : "text-yellow-600"}`}>
                    {selectedTemplate.atsScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">ATS Score</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    This template has been tested against major ATS systems and achieves a{" "}
                    <strong>{selectedTemplate.atsScore >= 90 ? "excellent" : "good"}</strong> compatibility score.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button className="flex-1" onClick={() => handleUseTemplate(selectedTemplate)}>
                  <Download className="mr-2 h-4 w-4" />
                  {selectedTemplate.premium ? "Upgrade to Use" : "Use This Template"}
                </Button>
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
