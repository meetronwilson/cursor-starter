/**
 * Pricing plans component that displays all available subscription tiers
 */
import { PricingCard, PricingTier } from "./pricing-card";
import { Container } from "@/components/layout/container";

// Define the pricing tiers
const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    description: "Basic features for individuals",
    price: "$0",
    priceDescription: "forever",
    features: [
      { text: "Up to 3 workspaces", included: true },
      { text: "Basic messaging", included: true },
      { text: "5GB storage", included: true },
      { text: "API access", included: false },
      { text: "Advanced integrations", included: false },
      { text: "Priority support", included: false },
    ],
    buttonText: "Get Started",
    buttonLink: "/sign-up",
  },
  {
    name: "Pro",
    description: "For professionals and small teams",
    price: "$12",
    priceDescription: "per user/month",
    features: [
      { text: "Unlimited workspaces", included: true },
      { text: "Advanced messaging", included: true },
      { text: "15GB storage", included: true },
      { text: "API access", included: true },
      { text: "Advanced integrations", included: true },
      { text: "Priority support", included: false },
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/sign-up?plan=pro",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "$24",
    priceDescription: "per user/month",
    features: [
      { text: "Unlimited workspaces", included: true },
      { text: "Advanced messaging", included: true },
      { text: "Unlimited storage", included: true },
      { text: "API access", included: true },
      { text: "Advanced integrations", included: true },
      { text: "Priority support", included: true },
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact",
  },
];

export function PricingPlans() {
  return (
    <Container>
      <div className="grid gap-8 md:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <PricingCard key={index} tier={tier} />
        ))}
      </div>
    </Container>
  );
} 