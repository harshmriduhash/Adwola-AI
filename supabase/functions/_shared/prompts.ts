// AI Prompts for content generation

export const STRATEGY_PROMPT = (brand: any, brief: any) => `
You are a senior social media strategist working for ${brand.brand_name}. 

BRAND CONTEXT:
- Brand Name: ${brand.brand_name}
- Brand Description: ${brand.brand_description}
- Tone of Voice: ${brand.tone_of_voice}

CAMPAIGN BRIEF:
- Topic: ${brief.topic}
- Goal: ${brief.goal}
- Call-to-Action: ${brief.cta_text}

Your task is to create a comprehensive content strategy. Generate exactly 4 different post concepts that align with the brand voice and achieve the campaign goal.

For each post concept, provide:
1. Platform (choose from: LinkedIn, Twitter, Instagram, Facebook)
2. Post Type (text-only, image+caption, video+caption, carousel)
3. Key Message (1-2 sentences)
4. Content Angle (educational, entertaining, promotional, inspirational)
5. Hashtag Strategy (3-5 relevant hashtags)

Format your response as a JSON array with exactly 4 objects:
[
  {
    "platform": "LinkedIn",
    "post_type": "text-only",
    "key_message": "Brief description of the post concept",
    "content_angle": "educational",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"]
  }
]

Keep responses concise and strategic. Focus on concepts that will drive engagement and achieve the stated goal.
`;

export const COPYWRITING_PROMPT = (brand: any, brief: any, strategy: any) => `
You are an expert social media copywriter specializing in ${
  strategy.platform
} content.

BRAND CONTEXT:
- Brand Name: ${brand.brand_name}
- Brand Description: ${brand.brand_description}  
- Tone of Voice: ${brand.tone_of_voice}

CONTENT STRATEGY:
- Platform: ${strategy.platform}
- Post Type: ${strategy.post_type}
- Key Message: ${strategy.key_message}
- Content Angle: ${strategy.content_angle}
- Hashtags: ${strategy.hashtags.join(", ")}

CAMPAIGN BRIEF:
- Topic: ${brief.topic}
- Goal: ${brief.goal}
- Call-to-Action: ${brief.cta_text}

Write compelling ${strategy.platform} content that follows these requirements:

PLATFORM-SPECIFIC GUIDELINES:
${getPlatformGuidelines(strategy.platform)}

OUTPUT FORMAT:
- Write the complete post copy
- Include the call-to-action naturally in the content
- Add the suggested hashtags at the end
- Keep the brand voice consistent
- Make it engaging and action-oriented

Focus on creating content that stops the scroll and drives meaningful engagement.
`;

function getPlatformGuidelines(platform: string): string {
  switch (platform) {
    case "LinkedIn":
      return `
- Professional tone with personal insights
- 1-3 paragraphs with line breaks
- Include industry context
- End with a thought-provoking question
- Use 3-5 relevant professional hashtags`;

    case "Twitter":
      return `
- Concise and punchy (under 280 characters)
- Use compelling hooks in first 10 words
- Include relevant emojis sparingly
- End with clear CTA
- Use 2-3 trending hashtags`;

    case "Instagram":
      return `
- Storytelling approach with emotional connection
- 3-5 short paragraphs with line breaks
- Include relatable anecdotes
- Strong visual description suggestions
- Use 5-10 mix of branded and trending hashtags`;

    case "Facebook":
      return `
- Conversational and community-focused
- 2-4 paragraphs with clear structure
- Include questions to encourage comments
- Personal touch with brand authority
- Use 3-5 hashtags (less emphasis than other platforms)`;

    default:
      return "Create engaging, platform-appropriate content.";
  }
}

export const PLATFORMS = [
  "LinkedIn",
  "Twitter",
  "Instagram",
  "Facebook",
] as const;
export type Platform = (typeof PLATFORMS)[number];
