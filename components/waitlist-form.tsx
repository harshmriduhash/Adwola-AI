"use client";

import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

interface WaitlistFormProps {
  variant?: "default" | "white";
}

export function WaitlistForm({ variant = "default" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("waitlist_emails").insert([
        {
          email: email.trim().toLowerCase(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          toast.error("You're already on our waitlist!");
        } else {
          console.error("Waitlist signup error:", error);
          toast.error("Something went wrong. Please try again.");
        }
        return;
      }

      setIsSuccess(true);
      toast.success("You're on the waitlist! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
          variant === "white"
            ? "bg-white/20 text-white"
            : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
        }`}
      >
        <Mail className="w-5 h-5" />
        <span className="font-medium">
          Thanks! You&apos;re on the waitlist.
        </span>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        className={
          variant === "white"
            ? "bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white"
            : ""
        }
      />
      <AnimatedButton
        type="submit"
        size="lg"
        disabled={isLoading}
        animation="glow"
        variant={variant === "white" ? "default" : "gradient"}
        className={
          variant === "white" ? "bg-white text-blue-600 hover:bg-white/90" : ""
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Joining...
          </>
        ) : (
          "Join Waitlist"
        )}
      </AnimatedButton>
    </form>
  );
}
