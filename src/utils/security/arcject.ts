import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  validateEmail,
  slidingWindow,
  ArcjetOptions,
  Primitive,
  Product,
} from '@arcjet/next';
import { env } from '@/env';
export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
  validateEmail,
};

export default arcjet({
  key: env.ARCJET_KEY,

  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE",    // Google, Bing, etc - essential for SEO
        "CATEGORY:MONITOR",         // Uptime monitoring services like Pingdom
        "CATEGORY:PREVIEW",         // Link previews from Slack, Discord, social media
        "CATEGORY:SOCIAL",          // Social media crawlers
        "CATEGORY:FEEDFETCHER",     // RSS and feed readers
        "CATEGORY:GOOGLE",          // All Google services (Analytics, Search Console, etc)
      ],
    }),
  ],
} satisfies ArcjetOptions<(Primitive | Product)[], readonly string[]>);
