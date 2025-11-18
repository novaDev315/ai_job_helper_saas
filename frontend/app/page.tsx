import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles, Target, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AI Job Helper</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="#features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary">
              Pricing
            </Link>
            <Link href="/dashboard" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Land Your Dream Job with{" "}
            <span className="text-primary">AI-Powered</span> Assistance
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Optimize your CV, generate tailored cover letters, and track applications with advanced AI.
            Increase your interview success rate by 3x.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center rounded-md border border-input bg-background px-6 py-3 text-lg font-semibold hover:bg-accent"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">3x</div>
              <div className="text-sm text-muted-foreground">Higher Interview Rate</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">75%</div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">40%</div>
              <div className="text-sm text-muted-foreground">Better ATS Scores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">Everything you need to succeed in your job search</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-card p-6">
              <feature.icon className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-y bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your needs</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border bg-card p-8 ${plan.featured ? "border-primary shadow-lg" : ""}`}
              >
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block w-full rounded-md py-2 text-center font-semibold ${
                    plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-input hover:bg-accent"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AI Job Helper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "AI CV Optimization",
    description: "Get your CV analyzed and optimized for ATS systems with AI-powered suggestions.",
    icon: Target,
  },
  {
    title: "Job-Specific Tailoring",
    description: "Automatically tailor your CV to match job descriptions and requirements.",
    icon: Sparkles,
  },
  {
    title: "Cover Letter Generator",
    description: "Generate compelling, personalized cover letters in seconds.",
    icon: TrendingUp,
  },
  {
    title: "Application Tracker",
    description: "Track all your job applications in one organized dashboard.",
    icon: CheckCircle,
  },
  {
    title: "Interview Preparation",
    description: "Practice with AI-generated questions tailored to your target role.",
    icon: Target,
  },
  {
    title: "Analytics & Insights",
    description: "Get actionable insights on your job search performance.",
    icon: TrendingUp,
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    features: [
      "3 CV optimizations",
      "5 cover letters",
      "Basic tracking",
      "Community support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: 29,
    features: [
      "Unlimited CV optimizations",
      "Unlimited cover letters",
      "Advanced analytics",
      "Interview prep",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: 49,
    features: [
      "Everything in Pro",
      "LinkedIn optimization",
      "Salary negotiation",
      "API access",
      "Dedicated support",
    ],
    featured: false,
  },
];
