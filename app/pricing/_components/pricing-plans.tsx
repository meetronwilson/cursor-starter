/**
 * Pricing plans component that displays all available subscription tiers
 */
import { PricingCard, PricingTier } from "./pricing-card";
import { Container } from "@/components/layout/container";

// Define the pricing tiers
const pricingTiers: PricingTier[] = [
  {
    name: "Vibe Explorer",
    description: "For individual developers",
    price: "$0",
    priceDescription: "forever",
    features: [
      { text: "Basic AI code generation", included: true },
      { text: "Natural language prompts", included: true },
      { text: "5 projects", included: true },
      { text: "Advanced AI models", included: false },
      { text: "Team collaboration", included: false },
      { text: "Priority support", included: false },
    ],
    buttonText: "Start Vibing",
    buttonLink: "/sign-up",
  },
  {
    name: "Vibe Creator",
    description: "For professional developers",
    price: "$19",
    priceDescription: "per month",
    features: [
      { text: "Advanced AI code generation", included: true },
      { text: "Natural language prompts", included: true },
      { text: "Unlimited projects", included: true },
      { text: "Advanced AI models", included: true },
      { text: "Team collaboration", included: false },
      { text: "Priority support", included: false },
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/sign-up?plan=pro",
    popular: true,
  },
  {
    name: "Vibe Team",
    description: "For development teams",
    price: "$49",
    priceDescription: "per user/month",
    features: [
      { text: "Advanced AI code generation", included: true },
      { text: "Natural language prompts", included: true },
      { text: "Unlimited projects", included: true },
      { text: "Advanced AI models", included: true },
      { text: "Team collaboration", included: true },
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