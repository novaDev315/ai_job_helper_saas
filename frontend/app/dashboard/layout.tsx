import Link from "next/link";
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Target, Settings, Sparkles, CreditCard } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Welcome back!</h1>
          </div>
          <div className="flex items-center space-x-4">
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
