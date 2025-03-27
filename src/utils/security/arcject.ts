import { env } from '@/env';
import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  validateEmail,
  slidingWindow,
  type ArcjetOptions,
  type Primitive,
  type Product,
  tokenBucket,
} from '@arcjet/next';
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
  characteristics: ['ip.src'],
  rules: [
    tokenBucket({
      mode: env.NODE_ENV === 'production' ? 'LIVE' : 'DRY_RUN',
      refillRate: 10,
      interval: 10,
      capacity: 20,
    }),
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: env.NODE_ENV === 'production' ? 'LIVE' : 'DRY_RUN' }),
    // Create a bot detection rule
    detectBot({
      mode: env.NODE_ENV === 'production' ? 'LIVE' : 'DRY_RUN', // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        'CATEGORY:SEARCH_ENGINE', // Google, Bing, etc - essential for SEO
        'CATEGORY:MONITOR', // Uptime monitoring services like Pingdom
        'CATEGORY:PREVIEW', // Link previews from Slack, Discord, social media
        'CATEGORY:SOCIAL', // Social media crawlers
        'CATEGORY:FEEDFETCHER', // RSS and feed readers
        'CATEGORY:GOOGLE', // All Google services (Analytics, Search Console, etc)
      ],
    }),
  ],
} satisfies ArcjetOptions<(Primitive | Product)[], readonly string[]>);
