"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  Target,
  Settings,
  Sparkles,
  CreditCard,
  Linkedin,
  TrendingUp,
  Search,
  FileStack,
  DollarSign,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          <span className="text-lg font-bold">AI Job Helper</span>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                pathname === item.href && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer - New Features */}
        <div className="border-t p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">NEW FEATURES</p>
          <nav className="space-y-1">
            {newFeatures.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900 dark:text-green-300">
                  New
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Welcome back!</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/dashboard/settings" className="text-sm hover:text-primary">
              Settings
            </Link>
            <div className="h-8 w-8 rounded-full bg-primary" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "CV Optimizer",
    href: "/dashboard/cv",
    icon: FileText,
  },
  {
    label: "Resume Templates",
    href: "/dashboard/templates",
    icon: FileStack,
  },
  {
    label: "Applications",
    href: "/dashboard/applications",
    icon: Briefcase,
  },
  {
    label: "Cover Letters",
    href: "/dashboard/cover-letters",
    icon: MessageSquare,
  },
  {
    label: "Interview Prep",
    href: "/dashboard/interview",
    icon: Target,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const newFeatures = [
  {
    label: "LinkedIn Optimizer",
    href: "/dashboard/linkedin",
    icon: Linkedin,
  },
  {
    label: "Skills Gap Analyzer",
    href: "/dashboard/skills",
    icon: TrendingUp,
  },
  {
    label: "Job Matcher",
    href: "/dashboard/job-matcher",
    icon: Search,
  },
  {
    label: "Salary Insights",
    href: "/dashboard/salary",
    icon: DollarSign,
  },
];
