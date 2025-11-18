"use client";

import { useState } from "react";
import { CreditCard, Check, Zap, Crown, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PricingTier {
  name: string;
  price: number;
  interval: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  stripePriceId?: string;
}

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState("free");
  const { toast } = useToast();

  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: 0,
      interval: "forever",
      icon: <CreditCard className="h-6 w-6" />,
      features: [
        "3 CV optimizations per month",
        "5 cover letters per month",
        "Basic application tracking",
        "10 interview questions",
        "Community support",
        "Basic analytics",
      ],
      stripePriceId: "free",
    },
    {
      name: "Pro",
      price: 29,
      interval: "month",
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      features: [
        "Unlimited CV optimizations",
        "Unlimited cover letters",
        "Advanced application tracking",
        "Unlimited interview prep",
        "Priority email support",
        "Advanced analytics & insights",
        "Export to PDF/DOCX",
        "Job match recommendations",
        "Follow-up reminders",
      ],
      stripePriceId: "price_pro_monthly",
    },
    {
      name: "Premium",
      price: 49,
      interval: "month",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Everything in Pro",
        "LinkedIn profile optimization",
        "Salary negotiation coach",
        "1-on-1 career coaching session",
        "Resume review by experts",
        "Priority support (24/7)",
        "Custom CV templates",
        "API access",
        "Early access to new features",
      ],
      stripePriceId: "price_premium_monthly",
    },
    {
      name: "Enterprise",
      price: 299,
      interval: "month",
      icon: <Building2 className="h-6 w-6" />,
      features: [
        "Everything in Premium",
        "Multi-user accounts (up to 10 users)",
        "Bulk CV processing",
        "Team analytics dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom contract terms",
        "Volume discounts available",
      ],
      stripePriceId: "price_enterprise_monthly",
    },
  ];

  const handleSubscribe = async (tier: PricingTier) => {
    if (tier.stripePriceId === "free") {
      toast({
        title: "Already on Free Plan",
        description: "You're currently using the free plan.",
      });
      return;
    }

    setLoading(tier.name);

    try {
      // Simulate Stripe checkout (replace with actual Stripe integration)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, this would redirect to Stripe Checkout:
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId: tier.stripePriceId }),
      // });
      // const session = await response.json();
      // window.location.href = session.url;

      toast({
        title: "Redirecting to checkout...",
        description: `Setting up your ${tier.name} subscription.`,
      });

      // Simulate successful subscription
      setTimeout(() => {
        setCurrentPlan(tier.name.toLowerCase());
        toast({
          title: "Subscription activated!",
          description: `Welcome to ${tier.name} plan!`,
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleManageBilling = () => {
    toast({
      title: "Opening billing portal...",
      description: "Redirecting to Stripe customer portal.",
    });
    // In production: window.location.href = '/api/create-portal-session';
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
          <p className="text-muted-foreground">
            Manage your subscription and billing information
          </p>
        </div>
        {currentPlan !== "free" && (
          <Button variant="outline" onClick={handleManageBilling}>
            Manage Billing
          </Button>
        )}
      </div>

      {/* Current Plan Card */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {currentPlan} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold capitalize">{currentPlan}</p>
              <p className="text-sm text-muted-foreground">
                {currentPlan === "free" ? "No billing" : "Billed monthly"}
              </p>
            </div>
            {currentPlan !== "free" && (
              <div className="text-right">
                <p className="text-3xl font-bold">
                  ${pricingTiers.find((t) => t.name.toLowerCase() === currentPlan)?.price}
                </p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>Track your feature usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CV Optimizations</span>
                <span className="font-medium">
                  {currentPlan === "free" ? "2 / 3" : "24 / Unlimited"}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: currentPlan === "free" ? "66%" : "100%",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Cover Letters Generated</span>
                <span className="font-medium">
                  {currentPlan === "free" ? "4 / 5" : "18 / Unlimited"}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: currentPlan === "free" ? "80%" : "100%",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Applications Tracked</span>
                <span className="font-medium">12 / Unlimited</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Available Plans</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${
                tier.popular ? "border-primary shadow-lg" : ""
              } ${
                currentPlan === tier.name.toLowerCase() ? "bg-muted/50" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2">
                  {tier.icon}
                  <CardTitle>{tier.name}</CardTitle>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">/{tier.interval}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(tier)}
                  disabled={
                    loading !== null ||
                    currentPlan === tier.name.toLowerCase()
                  }
                  className="w-full"
                  variant={
                    currentPlan === tier.name.toLowerCase()
                      ? "outline"
                      : tier.popular
                      ? "default"
                      : "outline"
                  }
                >
                  {loading === tier.name ? (
                    "Processing..."
                  ) : currentPlan === tier.name.toLowerCase() ? (
                    "Current Plan"
                  ) : tier.stripePriceId === "free" ? (
                    "Downgrade"
                  ) : (
                    <>
                      {currentPlan === "free" ? "Upgrade" : "Switch"} to {tier.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Can I change my plan anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect
              immediately, and we'll prorate your billing accordingly.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">What payment methods do you accept?</h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards (Visa, MasterCard, American Express) through
              Stripe. Enterprise plans can also pay via invoice.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Is there a refund policy?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact
              our support team for a full refund.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">What happens if I cancel?</h4>
            <p className="text-sm text-muted-foreground">
              You'll continue to have access to premium features until the end of your billing
              period. After that, your account will revert to the free plan.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
