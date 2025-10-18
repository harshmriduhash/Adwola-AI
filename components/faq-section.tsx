"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Book, ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How quickly can I start creating content with AmplifyAI?",
        answer:
          "You can start creating professional content within 5 minutes of signing up. Simply connect your social accounts, describe your brand voice, and generate your first campaign. No setup fees, no lengthy onboarding process.",
      },
      {
        question: "Do I need any design or writing experience?",
        answer:
          "Not at all! AmplifyAI is designed for everyone, regardless of experience level. Our AI handles all the creative heavy lifting - you just need to describe what you want, and we'll create professional-quality content that matches your brand voice.",
      },
      {
        question: "What social media platforms does AmplifyAI support?",
        answer:
          "AmplifyAI supports all major platforms including Facebook, Instagram, Twitter/X, LinkedIn, TikTok, Pinterest, and YouTube. Each piece of content is automatically optimized for the specific platform's requirements and best practices.",
      },
    ],
  },
  {
    category: "Pricing & Plans",
    questions: [
      {
        question: "Is there a free trial available?",
        answer:
          "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can create up to 50 pieces of content during your trial period to fully experience the power of AmplifyAI.",
      },
      {
        question: "Can I change or cancel my plan anytime?",
        answer:
          "Absolutely! You can upgrade, downgrade, or cancel your subscription at any time with just a few clicks. There are no long-term contracts or cancellation fees. If you cancel, you'll retain access until the end of your billing period.",
      },
      {
        question: "What happens if I exceed my monthly content limit?",
        answer:
          "If you're approaching your limit, we'll notify you in advance. You can either upgrade your plan or purchase additional content credits at any time. We'll never stop your service mid-month - you'll always have options to continue creating.",
      },
    ],
  },
  {
    category: "Features & Capabilities",
    questions: [
      {
        question: "How does AmplifyAI ensure content matches my brand voice?",
        answer:
          "Our AI analyzes your existing content, brand guidelines, and preferences to learn your unique voice. The more you use AmplifyAI, the better it becomes at matching your style. You can also provide feedback on generated content to continuously improve accuracy.",
      },
      {
        question: "Can I edit the AI-generated content before publishing?",
        answer:
          "Of course! Every piece of content can be fully edited, customized, and refined to your exact preferences. AmplifyAI provides a solid foundation that you can modify as needed. Most users find they need minimal edits, but full control is always yours.",
      },
      {
        question: "Does AmplifyAI provide analytics and performance tracking?",
        answer:
          "Yes! Our built-in analytics dashboard tracks engagement, reach, clicks, and conversions across all your social platforms. You'll get AI-powered insights and recommendations to optimize your content strategy for better performance.",
      },
    ],
  },
  {
    category: "Technical & Support",
    questions: [
      {
        question: "Is my data safe and secure with AmplifyAI?",
        answer:
          "Absolutely. We use enterprise-grade encryption and security measures to protect your data. We're SOC 2 compliant and never share your content or data with third parties. Your intellectual property remains 100% yours.",
      },
      {
        question: "What kind of customer support do you provide?",
        answer:
          "We offer 24/7 live chat support, comprehensive documentation, video tutorials, and email support. Our average response time is under 2 hours. Premium plan users also get priority support and dedicated account management.",
      },
      {
        question: "Can AmplifyAI integrate with my existing tools?",
        answer:
          "Yes! We integrate with popular tools like Hootsuite, Buffer, Canva, Google Analytics, Slack, and many more. We're constantly adding new integrations based on customer requests. Custom API integrations are available for enterprise clients.",
      },
    ],
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => (
  <motion.div
    className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden mb-4"
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    <button
      onClick={onToggle}
      className="w-full p-6 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-expanded={isOpen}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900" id="faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <HelpCircle className="w-4 h-4 mr-2" />
              Frequently Asked Questions
            </Badge>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Got{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                questions?
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;ve compiled answers to the most common questions about
              AmplifyAI. Can&apos;t find what you&apos;re looking for? Our
              support team is here to help.
            </p>
          </ScrollReveal>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {faqs.map((category, categoryIndex) => (
            <ScrollReveal
              key={category.category}
              direction="up"
              delay={0.6 + categoryIndex * 0.2}
            >
              <div>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                  {category.category}
                </h3>

                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const questionId = `${categoryIndex}-${index}`;
                    return (
                      <FAQItem
                        key={questionId}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openQuestion === questionId}
                        onToggle={() => toggleQuestion(questionId)}
                      />
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Still have questions section */}
        <ScrollReveal direction="up" delay={1.0}>
          <div className="mt-20">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-800 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our friendly support team is available 24/7 to help you get the
                most out of AmplifyAI. We typically respond within 2 hours.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <motion.div
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -2 }}
                >
                  <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant help from our support team
                  </p>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    animation="slide"
                    className="w-full"
                  >
                    Start Chat
                  </AnimatedButton>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -2 }}
                >
                  <Book className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive guides and tutorials
                  </p>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    animation="slide"
                    className="w-full"
                    asChild
                  >
                    <Link href="/docs">View Docs</Link>
                  </AnimatedButton>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -2 }}
                >
                  <HelpCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Help Center</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Search our knowledge base
                  </p>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    animation="slide"
                    className="w-full"
                    asChild
                  >
                    <Link href="/help">Get Help</Link>
                  </AnimatedButton>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
