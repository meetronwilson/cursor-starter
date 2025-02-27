/**
 * Pricing plans component that displays all available subscription tiers
 */
import { getSubscriptionPlans } from "@/actions/subscription";
import { PricingCard } from "./pricing-card";
import { Container } from "@/components/layout/container";

// Define the pricing tiers with Stripe price IDs
export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceDescription?: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  buttonLink?: string;
  priceId?: string;
  popular?: boolean;
}

// Fallback pricing tiers in case the server request fails
const fallbackPricingTiers: PricingTier[] = [
  {
    id: "free",
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
    id: "pro",
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
    priceId: "price_1QufoKLhAthRzToeZ9WkzgB9", // Replace with your actual Stripe price ID
    popular: true,
  },
  {
    id: "team",
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
    priceId: "price_1QufoKLhAthRzToeZ9WkzgB9", // Replace with your actual Stripe price ID
  },
];

export async function PricingPlans() {
  // Try to fetch plans from the server
  const plansResponse = await getSubscriptionPlans();
  
  // Use the fetched plans if available, otherwise use fallback
  const plans = plansResponse.success && plansResponse.data.length > 0
    ? plansResponse.data.map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description || "",
        price: `$${plan.price.monthly}`,
        priceDescription: "per month",
        features: plan.features.map(feature => ({ text: feature, included: true })),
        buttonText: plan.name === "Vibe Explorer" ? "Start Vibing" : "Subscribe",
        priceId: plan.priceIds.monthly,
        popular: plan.popular,
      } as PricingTier))
    : fallbackPricingTiers;

  return (
    <Container>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    </Container>
  );
} 