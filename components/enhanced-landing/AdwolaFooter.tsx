"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { adwolaDesignSystem, adwolaMessaging } from "@/lib/adwola-design-system";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const navigationLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "API", href: "/api-docs" },
  { name: "Integrations", href: "/integrations" },
  { name: "Templates", href: "/templates" },
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Press", href: "/press" },
  { name: "Partners", href: "/partners" },
  { name: "Contact", href: "/contact" },
  { name: "Documentation", href: "/docs" },
  { name: "Help Center", href: "/help" },
  { name: "Community", href: "/community" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "Webinars", href: "/webinars" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Privacy Policy", href: "/legal/privacy" },
  { name: "Terms of Service", href: "/legal/terms" },
  { name: "GDPR", href: "/legal/gdpr" },
  { name: "Acceptable Use", href: "/legal/acceptable-use" },
  { name: "Refund Policy", href: "/legal/refund-policy" },
  { name: "SLA", href: "/legal/sla" },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/adwola", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/adwola", icon: Linkedin },
  { name: "Facebook", href: "https://facebook.com/adwola", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/adwola", icon: Instagram },
  { name: "GitHub", href: "https://github.com/adwola", icon: Github },
  { name: "YouTube", href: "https://youtube.com/adwola", icon: Youtube },
];

interface AdwolaFooterProps {
  variant?: 'full' | 'minimal';
  showNewsletter?: boolean;
}

export function AdwolaFooter({ variant = 'full', showNewsletter = true }: AdwolaFooterProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate newsletter signup
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        {showNewsletter && variant === 'full' && (
          <ScrollReveal direction="up">
            <div className="py-16 border-b border-white/10">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Stay updated with{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {adwolaDesignSystem.brand.name}
                  </span>
                </h3>

                <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {adwolaMessaging.valueProposition}
                </p>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/40 focus:ring-white/20"
                  />
                  <AnimatedButton
                    type="submit"
                    variant="gradient"
                    animation="glow"
                    disabled={isLoading}
                    className="shrink-0 font-semibold"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </AnimatedButton>
                </form>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Main Footer Content */}
        <div className={variant === 'full' ? "py-16" : "py-12"}>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <Link
                  href="/"
                  className="flex items-center space-x-3 mb-6 group"
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <Sparkles className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="text-2xl font-bold">{adwolaDesignSystem.brand.name}</span>
                </Link>

                <p className="text-blue-50 text-lg leading-relaxed mb-6">
                  {adwolaMessaging.keyMessages.quality}. {adwolaMessaging.keyMessages.speed}.
                </p>

                <div className="space-y-3 text-blue-50">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>support@{adwolaDesignSystem.brand.domain}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Horizontal Navigation Links */}
            <div className="lg:col-span-4">
              <ScrollReveal direction="up" delay={0.2}>
                <nav className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 lg:gap-8">
                  {navigationLinks.map((link, index) => (
                    <div key={link.name} className="flex items-center">
                      <Link
                        href={link.href}
                        className="text-sm text-blue-50 hover:text-white transition-colors duration-200 hover:underline whitespace-nowrap"
                      >
                        {link.name}
                      </Link>
                      {index < navigationLinks.length - 1 && (
                        <span className="text-blue-200/50 ml-4 md:ml-6 lg:ml-8 select-none">
                          •
                        </span>
                      )}
                    </div>
                  ))}
                </nav>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <ScrollReveal direction="right">
              <div className="text-blue-50 text-center md:text-left">
                <p className="mb-1">© 2025 {adwolaDesignSystem.brand.name}. All rights reserved.</p>
                <p className="text-sm">
                  Built with ❤️ by{" "}
                  <Link
                    href="https://github.com/code-craka"
                    className="text-blue-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sayem Abdullah Rihan (@code-craka)
                  </Link>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="flex items-center space-x-4">
                <span className="text-blue-50 text-sm font-medium">
                  Follow us:
                </span>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-blue-50 hover:text-white transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="sr-only">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Additional Legal Info */}
          {variant === 'full' && (
            <ScrollReveal direction="up" delay={0.4}>
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="text-center text-sm text-blue-200/70 space-y-2">
                  <p>
                    {adwolaDesignSystem.brand.name} is GDPR compliant and SOC 2 certified. We take your
                    privacy seriously.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-xs">
                    <Link
                      href="/legal/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link
                      href="/legal/terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                    <span>•</span>
                    <Link
                      href="/legal/gdpr"
                      className="hover:text-white transition-colors"
                    >
                      GDPR Compliance
                    </Link>
                    <span>•</span>
                    <Link
                      href="/status"
                      className="hover:text-white transition-colors"
                    >
                      System Status
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </footer>
  );
}