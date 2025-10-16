// =============================================
// COMPONENT EXTRACTION FROM ADWOLA LANDING PAGE
// Convert artifact components to reusable project components
// =============================================

// === 1. BUTTON COMPONENT EXTRACTION ===

// FROM ARTIFACT (current implementation):
/*
<button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl duration-normal px-8 py-4 rounded-2xl text-lg transform hover:scale-105 overflow-hidden">
  <span className="relative z-10 flex items-center justify-center">
    🚀 Start with Adwola
    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 duration-fast" />
  </span>
  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] duration-slow skew-x-12"></div>
</button>
*/

// TO PROJECT COMPONENT:
import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  shimmer?: boolean;
}

export const AdwolaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    icon: Icon,
    iconPosition = 'right',
    loading = false,
    shimmer = true,
    className = '',
    disabled,
    ...props 
  }, ref) => {
    const baseClass = 'adwola-btn';
    const variantClass = `${baseClass}--${variant}`;
    const sizeClass = `${baseClass}--${size}`;
    
    return (
      <button 
        ref={ref}
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">
          {Icon && iconPosition === 'left' && (
            <Icon className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon className={`w-5 h-5 ml-2 group-hover:translate-x-1 adwola-transition-fast ${loading ? 'animate-spin' : ''}`} />
          )}
        </span>
        {shimmer && variant === 'primary' && (
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] adwola-transition-slow skew-x-12"></div>
        )}
      </button>
    );
  }
);

AdwolaButton.displayName = 'AdwolaButton';

// CSS for Button Component (add to design-system.css):
/*
.adwola-btn {
  font-family: var(--adwola-font);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all var(--adwola-transition-normal);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: var(--adwola-radius-xl);
}

.adwola-btn--primary {
  background: var(--adwola-gradient-primary);
  color: white;
  box-shadow: var(--adwola-shadow-lg);
}

.adwola-btn--primary:hover {
  background: linear-gradient(to right, var(--adwola-blue-700), var(--adwola-purple-700));
  box-shadow: var(--adwola-shadow-xl);
  transform: scale(1.02) translateY(-2px);
}

.adwola-btn--sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.adwola-btn--md { padding: 0.75rem 1.5rem; font-size: 1rem; }
.adwola-btn--lg { padding: 1rem 2rem; font-size: 1.125rem; }
.adwola-btn--xl { padding: 1.25rem 2.5rem; font-size: 1.25rem; }
*/

// === 2. CARD COMPONENT EXTRACTION ===

// FROM ARTIFACT (current implementation):
/*
<div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
  <div className="relative z-10">
    // Card content
  </div>
</div>
*/

// TO PROJECT COMPONENT:
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'pricing' | 'feature';
  children: React.ReactNode;
  popular?: boolean;
  hover?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const AdwolaCard = ({ 
  variant = 'default', 
  children, 
  popular = false,
  hover = true,
  className = '', 
  ...props 
}: CardProps) => {
  const baseClass = 'adwola-card';
  const variantClass = variant !== 'default' ? `${baseClass}--${variant}` : '';
  const popularClass = popular ? `${baseClass}--popular` : '';
  const hoverClass = hover ? 'adwola-hover-lift' : '';
  
  return (
    <div 
      className={`${baseClass} ${variantClass} ${popularClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`adwola-card__header ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }: CardBodyProps) => (
  <div className={`adwola-card__body ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`adwola-card__footer ${className}`}>
    {children}
  </div>
);

// Compound component pattern
AdwolaCard.Header = CardHeader;
AdwolaCard.Body = CardBody;
AdwolaCard.Footer = CardFooter;

// === 3. BADGE COMPONENT EXTRACTION ===

// FROM ARTIFACT:
/*
<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
  50% OFF
</div>
*/

// TO PROJECT COMPONENT:
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'new' | 'live';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  pulse?: boolean;
  icon?: LucideIcon;
}

export const AdwolaBadge = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  pulse = false,
  icon: Icon,
  className = '', 
  ...props 
}: BadgeProps) => {
  const baseClass = 'adwola-badge';
  const variantClass = `${baseClass}--${variant}`;
  const sizeClass = size !== 'md' ? `${baseClass}--${size}` : '';
  const pulseClass = pulse ? 'adwola-animate-pulse-glow' : '';
  
  return (
    <span 
      className={`${baseClass} ${variantClass} ${sizeClass} ${pulseClass} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {children}
    </span>
  );
};

// === 4. ANIMATED SECTION COMPONENT ===

// FROM ARTIFACT (scroll animations):
/*
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
*/

// TO PROJECT COMPONENT:
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'slideIn' | 'scaleIn' | 'float';
  delay?: number;
  threshold?: number;
  className?: string;
}

export const AdwolaAnimatedSection = ({ 
  children, 
  animation = 'fadeUp',
  delay = 0,
  threshold = 0.1,
  className = '' 
}: AnimatedSectionProps) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold });
  
  const animationClass = isVisible 
    ? `adwola-animate-${animation}` 
    : 'opacity-0 translate-y-4';
    
  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// === 5. CUSTOM HOOKS EXTRACTION ===

// useIntersectionObserver Hook
import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce || !hasTriggered) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [ref, isIntersecting] as const;
};

// useAdwolaTheme Hook
export const useAdwolaTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const savedTheme = (localStorage.getItem('adwola-theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('adwola-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  return { theme, toggleTheme };
};

// === 6. SECTION COMPONENTS EXTRACTION ===

// Hero Section Component
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  showDemo?: boolean;
}

export const AdwolaHeroSection = ({
  title = "Create Viral Content",
  subtitle = "Transform your social media strategy with Adwola. Create engaging content campaigns with AI power in minutes, not hours",
  description = "Powered by the world's most advanced AI models. Adwola creates professional-quality content that converts and drives real engagement across all platforms.",
  primaryCTA = "🚀 Start with Adwola",
  secondaryCTA = "Try Adwola Demo",
  showDemo = true
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="relative z-10 adwola-container pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AdwolaAnimatedSection animation="fadeUp">
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="flex items-center space-x-3">
                <AdwolaBadge variant="primary" icon={Users}>
                  Trusted by <span className="font-bold">10,000+</span> creators worldwide
                </AdwolaBadge>
                <AdwolaBadge variant="live" pulse>
                  Live
                </AdwolaBadge>
              </div>

              {/* Hero Title */}
              <h1 className="adwola-hero-title">
                Create
                <span className="relative inline-block mx-4">
                  <span className="adwola-gradient-text adwola-animate-pulse-glow">
                    Viral
                  </span>
                </span>
                Content
              </h1>

              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 leading-relaxed">
                {subtitle}
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <AdwolaButton variant="primary" size="lg" icon={ArrowRight}>
                  {primaryCTA}
                </AdwolaButton>
                <AdwolaButton variant="secondary" size="lg" icon={Play} iconPosition="left">
                  {secondaryCTA}
                </AdwolaButton>
              </div>
            </div>
          </AdwolaAnimatedSection>

          {showDemo && (
            <AdwolaAnimatedSection animation="slideIn" delay={0.3}>
              <AdwolaCard variant="interactive">
                {/* AI Demo Panel */}
                <CardHeader>
                  <h3 className="text-xl font-bold text-gray-900">AI Content Studio</h3>
                  <AdwolaBadge variant="live">Live Demo</AdwolaBadge>
                </CardHeader>
                <CardBody>
                  {/* Demo content here */}
                </CardBody>
              </AdwolaCard>
            </AdwolaAnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
};

// === 7. USAGE EXAMPLES ===

// Example: Using extracted components in your project
export const ExampleUsage = () => {
  return (
    <div>
      {/* Button Examples */}
      <AdwolaButton variant="primary" size="lg" icon={ArrowRight}>
        Primary Button
      </AdwolaButton>
      
      <AdwolaButton variant="secondary" size="md" icon={Play} iconPosition="left">
        Secondary Button
      </AdwolaButton>

      {/* Card Examples */}
      <AdwolaCard variant="pricing" popular>
        <AdwolaCard.Header>
          <h3>Professional Plan</h3>
          <p>Best for growing businesses</p>
        </AdwolaCard.Header>
        <AdwolaCard.Body>
          <div className="text-5xl font-bold">$79</div>
          <p>per month</p>
        </AdwolaCard.Body>
        <AdwolaCard.Footer>
          <AdwolaButton variant="primary" className="w-full">
            Get Started
          </AdwolaButton>
        </AdwolaCard.Footer>
      </AdwolaCard>

      {/* Badge Examples */}
      <AdwolaBadge variant="success">50% OFF</AdwolaBadge>
      <AdwolaBadge variant="new" pulse>NEW</AdwolaBadge>
      <AdwolaBadge variant="live" icon={Activity}>Live</AdwolaBadge>

      {/* Animated Section */}
      <AdwolaAnimatedSection animation="fadeUp" delay={0.2}>
        <h2>This content animates on scroll</h2>
      </AdwolaAnimatedSection>
    </div>
  );
};

// === 8. PROJECT STRUCTURE ===

/*
src/
  components/
    ui/
      Button.tsx              // AdwolaButton component
      Card.tsx                // AdwolaCard with compound pattern
      Badge.tsx               // AdwolaBadge component
      AnimatedSection.tsx     // AdwolaAnimatedSection component
    sections/
      HeroSection.tsx         // AdwolaHeroSection component
      MetricsSection.tsx      // Metrics display
      FeaturesSection.tsx     // Features showcase
      PricingSection.tsx      // Pricing tiers
      SocialProofSection.tsx  // Testimonials
    layout/
      Header.tsx              // Navigation header
      Footer.tsx              // Footer with links
  hooks/
    useIntersectionObserver.ts
    useAdwolaTheme.ts
    useScrollAnimation.ts
  styles/
    design-system.css         // Complete Adwola design system
    globals.css               // Global styles
  types/
    index.ts                  // TypeScript interfaces
  utils/
    animations.ts             // Animation utilities
  App.tsx                     // Main app component
  main.tsx                    // Entry point
*/

export default {
  AdwolaButton,
  AdwolaCard,
  AdwolaBadge,
  AdwolaAnimatedSection,
  AdwolaHeroSection,
  useIntersectionObserver,
  useAdwolaTheme
};