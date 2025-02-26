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
    question: "What is Vibe Coding?",
    answer: "Vibe Coding is a new programming paradigm where you use AI tools to generate code through natural language prompts. It allows you to focus on high-level problem-solving while AI handles the technical implementation details, making development faster and more enjoyable."
  },
  {
    question: "Do I need to know how to code to use CursorStarter?",
    answer: "While some programming knowledge is helpful, CursorStarter is designed to be accessible to users with varying levels of technical expertise. The AI-assisted development features can help bridge knowledge gaps and accelerate learning for beginners."
  },
  {
    question: "How does the pricing work?",
    answer: "Our pricing is based on a per-user model for team plans, with individual plans available at a flat monthly rate. We offer monthly and annual billing options, with a discount for annual commitments."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial on our Vibe Creator plan. No credit card is required to start your trial. You'll receive a notification before your trial ends, at which point you can choose to subscribe or downgrade to our Vibe Explorer plan."
  },
  {
    question: "How does Vibe Coding compare to traditional coding?",
    answer: "Vibe Coding complements traditional coding by handling repetitive tasks, boilerplate code, and implementation details. It allows you to express your intent in natural language and focus on creativity and problem-solving. Many developers find it increases productivity and enjoyment while reducing technical friction."
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