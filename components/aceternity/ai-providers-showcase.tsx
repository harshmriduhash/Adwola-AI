"use client";

import { motion } from "framer-motion";
import { memo } from "react";

import { cn } from "@/lib/utils";

// AI Provider logos as SVG components for better performance
const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      fill="currentColor"
    />
  </svg>
);

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      d="M7.307 2.5c-.83 0-1.5.67-1.5 1.5 0 .83.67 1.5 1.5 1.5.83 0 1.5-.67 1.5-1.5 0-.83-.67-1.5-1.5-1.5zm9.386 0c-.83 0-1.5.67-1.5 1.5 0 .83.67 1.5 1.5 1.5.83 0 1.5-.67 1.5-1.5 0-.83-.67-1.5-1.5-1.5zM12 6c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
      fill="currentColor"
    />
  </svg>
);

const GeminiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169-.007-.336-.007-.505-.007-.943 0-1.835.377-2.388 1.007-.484-.63-1.291-1.007-2.175-1.007s-1.691.377-2.175 1.007C9.772 8.53 8.88 8.153 7.937 8.153c-.169 0-.336 0-.505.007C6.045 9.112 5.5 10.526 5.5 12.153c0 1.627.545 3.041 1.932 3.993.169.007.336.007.505.007.943 0 1.835-.377 2.388-1.007.484.63 1.291 1.007 2.175 1.007s1.691-.377 2.175-1.007c.553.63 1.445 1.007 2.388 1.007.169 0 .336 0 .505-.007 1.387-.952 1.932-2.366 1.932-3.993 0-1.627-.545-3.041-1.932-3.993z"
      fill="currentColor"
    />
  </svg>
);

const GitHubCopilotLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      d="M12 0c6.623 0 12 5.377 12 12 0 5.623-3.872 10.328-9.092 11.63-.097-.267-.15-.558-.15-.857v-2.725c0-.806-.344-1.356-.722-1.628 2.37-.262 4.862-1.158 4.862-5.212 0-1.15-.412-2.098-1.088-2.837.109-.262.472-1.311-.103-2.732 0 0-.891-.284-2.916 1.084-.844-.234-1.75-.35-2.648-.355-.9.005-1.804.121-2.648.355-2.025-1.368-2.917-1.084-2.917-1.084-.574 1.421-.211 2.47-.103 2.732-.675.739-1.087 1.687-1.087 2.837 0 4.044 2.487 4.955 4.85 5.221-.305.262-.58.726-.675 1.405-.608.262-2.15.739-3.103-.886-.58-.997-1.624-1.074-1.624-1.074-1.036-.007-.07.644-.07.644.692.319 1.175 1.547 1.175 1.547.622 1.884 3.574 1.25 3.574 1.25v2.125c0 .298-.052.589-.15.857C3.872 22.328 0 17.623 0 12 0 5.377 5.377 0 12 0z"
      fill="currentColor"
    />
  </svg>
);

interface AIProviderCard {
  title: string;
  description: string;
  logo: React.ComponentType;
  gradient: string;
  glowColor: string;
}

const aiProviders: AIProviderCard[] = [
  {
    title: "OpenAI GPT-4",
    description: "Advanced reasoning & creative content generation",
    logo: OpenAILogo,
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "bg-emerald-500/20",
  },
  {
    title: "Claude 3.5 Sonnet",
    description: "Sophisticated analysis & strategic thinking",
    logo: ClaudeLogo,
    gradient: "from-orange-500 to-red-600",
    glowColor: "bg-orange-500/20",
  },
  {
    title: "Google Gemini",
    description: "Multimodal intelligence & data insights",
    logo: GeminiLogo,
    gradient: "from-blue-500 to-purple-600",
    glowColor: "bg-blue-500/20",
  },
  {
    title: "Meta AI",
    description: "Social media optimization & engagement",
    logo: MetaLogo,
    gradient: "from-purple-500 to-pink-600",
    glowColor: "bg-purple-500/20",
  },
  {
    title: "GitHub Copilot",
    description: "Code generation & technical content",
    logo: GitHubCopilotLogo,
    gradient: "from-gray-600 to-gray-800",
    glowColor: "bg-gray-500/20",
  },
];

const Sparkles = ({ className }: { className?: string }) => (
  <motion.svg
    className={cn("absolute", className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <path
      d="M12 0L14.09 8.26L22 6L14.09 8.26L12 0L9.91 8.26L2 6L9.91 8.26L12 0Z"
      fill="url(#sparkle-gradient)"
    />
    <defs>
      <linearGradient id="sparkle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const ProviderCard = memo(function ProviderCard({
  provider,
  index,
}: {
  provider: AIProviderCard;
  index: number;
}) {
  const Logo = provider.logo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      className={cn(
        "relative group cursor-pointer touch-manipulation",
        "rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6",
        "min-h-[180px] sm:min-h-[200px] lg:min-h-[220px]",
        "bg-white/80 dark:bg-gray-900/80",
        "backdrop-blur-sm border border-white/20 dark:border-gray-700/20",
        "shadow-lg hover:shadow-2xl active:shadow-xl transition-all duration-300",
        "overflow-hidden flex flex-col"
      )}
    >
      {/* Gradient background overlay */}
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          `bg-gradient-to-br ${provider.gradient}`
        )}
      />

      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl blur-lg",
          provider.glowColor
        )}
      />

      {/* Sparkles */}
      <Sparkles className="top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Sparkles className="bottom-4 left-4 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <motion.div
          className={cn(
            "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12",
            "rounded-lg sm:rounded-xl p-1.5 sm:p-2",
            "bg-gradient-to-br from-white to-gray-50",
            "dark:from-gray-800 dark:to-gray-900",
            "border border-gray-200 dark:border-gray-700",
            "flex items-center justify-center mb-2 sm:mb-3",
            "group-hover:scale-110 transition-transform duration-300"
          )}
          whileHover={{ rotate: 5 }}
        >
          <Logo />
        </motion.div>

        {/* Content - Flexible grow section */}
        <div className="space-y-1 sm:space-y-2 flex-grow">
          <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-white leading-tight">
            {provider.title}
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            {provider.description}
          </p>
        </div>

        {/* Status indicator - Fixed at bottom */}
        <motion.div
          className="flex items-center space-x-2 mt-3 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
            Active
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
});

export const AIProvidersShowcase = memo(function AIProvidersShowcase({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-3 sm:mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
            Powered by Leading AI
          </span>
        </motion.div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Multi-AI Intelligence
        </h2>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
          Harness the collective power of the world&apos;s most advanced AI models for
          unparalleled content creation and strategic insights.
        </p>
      </motion.div>

      {/* AI Provider Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
        {aiProviders.map((provider, index) => (
          <ProviderCard key={provider.title} provider={provider} index={index} />
        ))}
      </div>

      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10"
        animate={{
          x: [0, -30, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});