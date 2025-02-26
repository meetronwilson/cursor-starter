/**
 * Pricing FAQ component with common pricing questions
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";

// FAQ items
const faqItems = [
  {
    question: "How does the pricing work?",
    answer: "Our pricing is based on a per-user model. You pay for each user in your organization who needs access to the platform. We offer monthly and annual billing options, with a discount for annual commitments."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial on our Pro plan. No credit card is required to start your trial. You'll receive a notification before your trial ends, at which point you can choose to subscribe or downgrade to our Free plan."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also offer invoicing with net-30 payment terms."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions can be canceled at any time, but we don't provide partial refunds for unused time."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "If you cancel your subscription, your account will be downgraded to the Free plan at the end of your billing cycle. You'll retain access to your data, but with the limitations of the Free plan. If you delete your account, all data will be permanently removed after 30 days."
  }
];

export function PricingFAQ() {
  return (
    <Container size="small">
      <div className="mx-auto max-w-3xl py-12">
        <h2 className="text-center text-3xl font-bold tracking-tight mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
} 