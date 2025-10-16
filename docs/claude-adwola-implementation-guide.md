# Claude Code Implementation Guide

## Building the Adwola Landing Page with Claude Code

---

## 🚀 **Step-by-Step Claude Code Implementation**

### **Phase 1: Project Setup**

```bash
# 1. Create new project directory
mkdir adwola-landing-page
cd adwola-landing-page

# 2. Initialize the project with Claude Code
claude-code init react-typescript
```

**Claude Code Prompt for Setup:**

```
Create a modern React + TypeScript project structure for an AI-powered social media content creation landing page called "Adwola". 

Requirements:
- React 18 with TypeScript
- Tailwind CSS for styling 
- Lucide React for icons
- Proper file structure with components, styles, and assets folders
- Package.json with all necessary dependencies
- Index.html with proper meta tags and Inter font loading

Project structure should be:
```

src/
  components/
    ui/
    layout/
    sections/
  styles/
    design-system.css
    globals.css
  types/
  utils/
  App.tsx
  main.tsx

```

Please set up the complete project structure with proper TypeScript configurations.
```

### **Phase 2: Design System Implementation**

**Claude Code Prompt for Design System:**

```
Implement the complete Adwola design system based on these specifications:

CREATE FILE: src/styles/design-system.css

Requirements:
- Import Inter font from Google Fonts
- CSS custom properties for the Adwola brand colors:
  * Primary blues: #3b82f6, #2563eb, #1d4ed8
  * Secondary purples: #8b5cf6, #7c3aed, #6d28d9  
  * Logo colors: #10b981, #a7f3d0, #047857
  * Semantic colors: success (#22c55e), warning (#f59e0b), error (#ef4444)
- Keyframe animations: float, glow, pulse-glow, shimmer
- Component classes: .adwola-btn-primary, .adwola-card, .adwola-badge variants
- Utility classes: .adwola-animate-*, .adwola-gradient-text, .adwola-transition-*
- Responsive typography system
- Dark mode support
- Accessibility focus states
- Reduced motion support

Follow the design system principles from our established Adwola brand guidelines.
```

### **Phase 3: Component Library Creation**

**Claude Code Prompt for Components:**

```
Create a comprehensive component library for the Adwola landing page:

CREATE COMPONENTS:
1. src/components/ui/Button.tsx - Primary, secondary, ghost variants
2. src/components/ui/Card.tsx - Default, interactive, pricing variants  
3. src/components/ui/Badge.tsx - Primary, success, warning, new variants
4. src/components/ui/AnimatedSection.tsx - Intersection observer animations
5. src/components/layout/Header.tsx - Navigation with logo
6. src/components/layout/Footer.tsx - Complete footer with links

Each component should:
- Use TypeScript with proper prop interfaces
- Follow Adwola design system classes (.adwola-btn-primary, etc.)
- Include proper accessibility attributes
- Support dark mode variants
- Have hover and focus states
- Include JSDoc documentation

Example Button interface:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
```

Use our established Adwola brand colors and design patterns.

```

### **Phase 4: Landing Page Sections**

**Claude Code Prompt for Hero Section:**
```

CREATE FILE: src/components/sections/HeroSection.tsx

Build the Adwola hero section with these exact specifications:

CONTENT:

- Hero title: "Create Viral Content" (with "Viral" highlighted)
- Subtitle: "Transform your social media strategy with Adwola. Create engaging content campaigns with AI power in minutes, not hours"
- Trust badge: "Trusted by 10,000+ creators worldwide" with live indicator
- Description: Professional-quality content paragraph
- Pricing card: "Start at $29" with "50% OFF" badge
- CTA buttons: "🚀 Start with Adwola" (primary), "Try Adwola Demo" (secondary)
- Trust badges: "99.9% Uptime", "4.9/5 Satisfaction", "95% Time Reduction"

FEATURES:

- Interactive AI demo panel on the right
- AI provider selection (OpenAI GPT-4 vs Vertex AI)
- Live content generation animation
- Platform optimization preview (LinkedIn, Twitter, Facebook, Instagram)
- Floating background elements with mouse tracking
- Responsive design for mobile/tablet/desktop

STYLING:

- Use Adwola design system classes exclusively
- Gradient backgrounds: from-gray-50 via-blue-50/30 to-purple-50/30
- Typography: .adwola-hero-title, .adwola-section-title
- Buttons: .adwola-btn-primary, .adwola-btn-secondary
- Cards: .adwola-card, .adwola-card-interactive
- Animations: .adwola-animate-float, .adwola-animate-pulse-glow

Include proper TypeScript interfaces and make the demo functional.

```

**Claude Code Prompt for Metrics Section:**
```

CREATE FILE: src/components/sections/MetricsSection.tsx

Build the key metrics section showing real results:

METRICS DATA:

- Average Engagement Boost: 250% (+45% vs last month)
- Content Creation Speed: 15x (+78% vs last month)  
- Time Saved Weekly: 24hrs (+92% vs last month)
- ROI Improvement: 340% (+125% vs last month)

DESIGN:

- 4-column responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
- Each metric card with icon, value, description, trend indicator
- Hover effects with lift and glow
- Gradient icon backgrounds matching metric type
- Use TrendingUp, Zap, Clock, Target icons from Lucide

STYLING:

- Section: .adwola-container with py-20
- Cards: .adwola-card with .adwola-hover-lift
- Typography: .adwola-section-title for heading
- Colors: Use CSS custom properties (--adwola-success, --adwola-primary, etc.)

Include proper animations and responsive behavior.

```

**Claude Code Prompt for Features Section:**
```

CREATE FILE: src/components/sections/FeaturesSection.tsx

Build the features section highlighting Adwola's capabilities:

FEATURES (4 cards):

1. "Dual AI Powerhouse" - Brain icon, blue-purple gradient
   - Description: Harness both OpenAI GPT-4 and Google Vertex AI
   - Preview: "OpenAI excels at creativity and storytelling, while Vertex AI delivers precision and technical accuracy"
   - Highlight: NEW badge

2. "Multi-Platform Mastery" - Globe icon, green-teal gradient  
   - Description: Content automatically optimized for LinkedIn, Twitter, Facebook, and Instagram
   - Preview: "LinkedIn gets professional insights, Twitter gets punchy hooks, Facebook gets community stories"

3. "Smart Scheduling" - Calendar icon, orange-red gradient
   - Description: AI analyzes 50M+ data points to determine optimal posting times
   - Preview: "Peak engagement times calculated from audience behavior, time zones, and historical performance data"

4. "Performance Analytics" - BarChart3 icon, purple-pink gradient
   - Description: Deep insights into content performance with AI-powered recommendations
   - Preview: "Track engagement, reach, conversions, and ROI with actionable insights"

LAYOUT:

- Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop
- Each card with icon, title, description, AI preview panel
- Hover effects with scale and glow
- Background blur effects

Use Adwola design system throughout.

```

### **Phase 5: Advanced Sections**

**Claude Code Prompt for Pricing Section:**
```

CREATE FILE: src/components/sections/PricingSection.tsx

Build the pricing section with 3 tiers:

PRICING TIERS:

1. Starter ($29/mo, was $58) - Zap icon, green gradient
   - 100 AI posts/month, OpenAI GPT-4, 4 platforms, basic analytics, email support

2. Professional ($79/mo, was $158) - Star icon, blue-purple gradient, MOST POPULAR
   - 500 AI posts/month, dual AI, unlimited platforms, advanced analytics, priority support, team collaboration (5 members), A/B testing

3. Enterprise (Custom pricing) - Users icon, purple-pink gradient  
   - Unlimited content, custom models, white-label, dedicated manager, custom integrations, unlimited team, 24/7 support

FEATURES:

- Monthly/yearly toggle with "Save 20%" indicator
- Popular plan highlighting with crown badge and scale effect
- Feature lists with checkmark icons
- "Start Free Trial" buttons with shimmer effect
- "Still have questions?" CTA section

STYLING:

- Use .adwola-card-pricing and .adwola-card-pricing--popular
- Gradient backgrounds and proper spacing
- Responsive 3-column grid

Include proper state management for billing toggle.

```

**Claude Code Prompt for Social Proof Section:**
```

CREATE FILE: src/components/sections/SocialProofSection.tsx

Build testimonials and social proof section:

TESTIMONIALS (3 cards):

1. Sarah Chen - Marketing Director @ TechFlow
   - Avatar: "SC" with pink-rose gradient
   - Quote: "Adwola transformed our content strategy completely. We went from struggling to post consistently to creating viral content that drives real business results."
   - Metric: "450% engagement increase"
   - Verified badge

2. Marcus Rodriguez - Content Creator @ 250K followers  
   - Avatar: "MR" with blue-cyan gradient
   - Quote: "As a full-time creator, Adwola saves me 20+ hours per week. The dual AI system means I always get the perfect tone and style for each platform."
   - Metric: "20 hours saved weekly"

3. Emma Thompson - Agency Owner @ CreativeForce
   - Avatar: "ET" with purple-indigo gradient  
   - Quote: "Managing content for 30+ clients was overwhelming until Adwola. Now we deliver consistent, high-quality content at scale."
   - Metric: "30+ clients managed"

DESIGN:

- 5-star ratings with verified badges
- Gradient avatar circles
- Hover effects with blur backgrounds
- Metric highlight boxes

Include rating display (4.9/5 from 2,847 reviews) in header.

```

### **Phase 6: Final Assembly**

**Claude Code Prompt for Main App:**
```

CREATE FILE: src/App.tsx

Assemble the complete Adwola landing page:

STRUCTURE:

1. Header with navigation
2. HeroSection with AI demo
3. MetricsSection showing results  
4. FeaturesSection highlighting capabilities
5. PricingSection with 3 tiers
6. SocialProofSection with testimonials
7. Platform Performance stats section (10,000+ creators, 2.5M+ posts, 98.7% satisfaction, 50+ countries)
8. FAQ section with 6 common questions
9. Final CTA section with gradient background
10. Newsletter signup section
11. Complete footer with navigation

GLOBAL FEATURES:

- Smooth scroll behavior
- Back to top button
- Intersection observer animations
- Mouse position tracking for floating elements
- Responsive design throughout
- SEO meta tags
- Performance optimizations

STYLING:

- Import design-system.css
- Use systematic Adwola classes throughout
- Consistent spacing with .adwola-container
- Proper color usage from CSS custom properties

Ensure all components work together seamlessly with proper TypeScript types.

```

---

## 📦 **Component Extraction Commands**

### **Extract Button Component**

**Claude Code Prompt:**
```

Extract and optimize the Button component from the current landing page:

REQUIREMENTS:

- Create src/components/ui/Button.tsx
- Support variants: primary, secondary, ghost
- Support sizes: sm, md, lg, xl  
- Include shimmer effect for primary buttons
- Add proper TypeScript interfaces
- Include accessibility attributes (ARIA)
- Support disabled state
- Add loading state with spinner
- Forward refs for advanced usage

EXAMPLE USAGE:

```tsx
<Button variant="primary" size="lg" className="custom-class">
  🚀 Start with Adwola
</Button>
```

Use the exact styling from our Adwola design system.

```

### **Extract Card Component**

**Claude Code Prompt:**
```

Extract and optimize the Card component:

CREATE: src/components/ui/Card.tsx

VARIANTS:

- default: Basic card with hover effects
- interactive: Card with click interactions and glow
- pricing: Pricing card with popular badge support
- feature: Feature card with icon and preview panel

FEATURES:

- Compound component pattern (Card.Header, Card.Body, Card.Footer)
- Hover animations (lift, scale, glow)
- Accessibility support
- Responsive design
- TypeScript interfaces

EXAMPLE:

```tsx
<Card variant="interactive" onClick={handleClick}>
  <Card.Header>
    <Card.Title>Feature Title</Card.Title>
    <Card.Subtitle>Description</Card.Subtitle>
  </Card.Header>
  <Card.Body>Content here</Card.Body>
</Card>
```

Follow Adwola design system patterns exactly.

```

### **Extract Animation System**

**Claude Code Prompt:**
```

Create a complete animation system:

CREATE FILES:

- src/hooks/useIntersectionObserver.ts
- src/hooks/useScrollAnimation.ts  
- src/components/ui/AnimatedSection.tsx
- src/utils/animations.ts

FEATURES:

- Intersection observer for scroll-triggered animations
- Mouse position tracking for floating elements
- Reduced motion support
- Performance optimized
- TypeScript interfaces

ANIMATIONS:

- fadeUp, slideIn, scaleIn entrance animations
- float, glow, pulse-glow continuous animations
- hover effects (lift, scale, shimmer)

USAGE:

```tsx
<AnimatedSection animation="fadeUp" delay={0.2}>
  <h2>Animated Content</h2>
</AnimatedSection>
```

Implement exactly as used in the Adwola landing page.

```

---

## 🎯 **Design System Compliance Checklist**

When using Claude Code, ensure every prompt follows these guidelines:

### **✅ Required in Every Prompt:**
- [ ] **Use Adwola design system classes** (.adwola-btn-primary, .adwola-card, etc.)
- [ ] **Reference CSS custom properties** (--adwola-primary-600, etc.)
- [ ] **Include TypeScript interfaces** for all components
- [ ] **Add accessibility attributes** (ARIA labels, focus states)
- [ ] **Support responsive design** (mobile-first approach)
- [ ] **Include hover and focus states**
- [ ] **Add proper JSDoc documentation**

### **✅ Color Usage:**
```css
/* Always use CSS custom properties */
background: var(--adwola-primary-600);
color: var(--adwola-neutral-900);

/* Never use hardcoded colors */
background: #2563eb; /* ❌ DON'T DO THIS */
```

### **✅ Component Structure:**

```tsx
interface ComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Component = ({ variant = 'primary', ...props }: ComponentProps) => {
  return (
    <div className={`adwola-component adwola-component--${variant}`}>
      {props.children}
    </div>
  );
};
```

### **✅ Animation Implementation:**

```tsx
// Use custom hooks for animations
const [ref, isVisible] = useScrollAnimation();

return (
  <div 
    ref={ref} 
    className={`adwola-animate-fade-up ${isVisible ? 'animate' : ''}`}
  >
    Content
  </div>
);
```

---

## 🚀 **Quick Start Commands**

**1. Complete Project Setup:**

```bash
claude-code create react-project adwola-landing
cd adwola-landing
claude-code generate design-system --follow-adwola-guidelines
```

**2. Component Generation:**

```bash
claude-code generate component Button --variant=adwola --with-design-system
claude-code generate component Card --variant=adwola --with-animations  
claude-code generate section Hero --template=adwola-landing
```

**3. Full Page Assembly:**

```bash
claude-code build landing-page --design-system=adwola --responsive --accessible
```

---

## 📋 **Verification Commands**

After implementation, use these Claude Code prompts to verify:

```bash
# Check design system compliance
claude-code audit design-system --check-adwola-guidelines

# Verify accessibility  
claude-code test accessibility --standard=wcag-2.1-aa

# Performance check
claude-code analyze performance --report-metrics

# Responsive testing
claude-code test responsive --breakpoints=mobile,tablet,desktop
```

This approach ensures you get a **pixel-perfect implementation** of the landing page while maintaining the **systematic design approach** we've established!

Would you like me to provide **specific component extraction prompts** for any particular section, or help you with the **Claude Code setup process**?
