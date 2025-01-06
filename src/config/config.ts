import { z } from 'zod';

const AuthCookie = {
  auth: 'auth',
  serverUrl: 'x-url',
  tokenDuration: 60 * 60 * 24 * 7,
} as const;

export interface IConfig {
  // Observability & Monitoring
  observability: {
    datadog: {
      applicationId: string;
      clientToken: string;
      site: string;
    };
    sentry: {
      dsn: string;
      authToken: string;
    };
  };

  // Application Core Settings
  app: {
    environment: 'development' | 'production' | 'test';
    version: string;
    url?: string;
    analyze: boolean;
  };

  // Database & Backend Configuration
  backend: {
    supabase: {
      url: string;
      anonKey: string;
      serviceRoleKey: string;
      jwtSecret: string;
      accessToken: string;
    };
    database: {
      url: string;
      directUrl: string;
      projectRegion: string;
    };
  };

  // Authentication & Security
  security: {
    auth: {
      cookie: typeof AuthCookie.auth;
      secret: string;
      serverUrlKey: typeof AuthCookie.serverUrl;
      authSecret: string;
      tokenDuration: typeof AuthCookie.tokenDuration;
    };
    password: {
      pepper: string;
    };
  };

  // Third-Party Integrations
  integrations: {
    google: {
      maps: {
        apiKey: string;
        mapId: string;
      };
      oauth: {
        clientId: string;
        clientSecret: string;
      };
    };
    analytics: {
      googleAnalytics: {
        measurementId: string;
        trackingId: string;
      };
      googleTagManager: {
        id: string;
      };
      adSense: {
        id: string;
      };
    };
    email: {
      resend: {
        apiKey: string;
        host: string;
        port: number;
        username: string;
        from: string;
        to: string;
      };
    };
    upstash: {
      redis: {
        url: string;
        token: string;
      };
    };
  };

  // Version Control
  versionControl: {
    vercel: {
      gitCommitSha?: string;
    };
    github: {
      token: string;
    };
  };
}

const configSchema = z.object({
  observability: z.object({
    datadog: z.object({
      applicationId: z.string().min(1, 'Datadog Application ID is required'),
      clientToken: z.string().min(1, 'Datadog Client Token is required'),
      site: z.string().min(1, 'Datadog Site is required'),
    }),
    sentry: z.object({
      dsn: z.string().url('Invalid Sentry DSN'),
      authToken: z.string().min(1, 'Sentry Auth Token is required'),
    }),
  }),

  app: z.object({
    environment: z.enum(['development', 'production', 'test']),
    version: z.string().min(1, 'App Version is required'),
    url: z.string().url('Invalid App URL'),
    analyze: z.boolean(),
  }),

  backend: z.object({
    supabase: z.object({
      url: z.string().url('Invalid Supabase URL'),
      anonKey: z.string().min(1, 'Supabase Anon Key is required'),
      serviceRoleKey: z.string().min(1, 'Supabase Service Role Key is required'),
      jwtSecret: z.string().min(1, 'Supabase JWT Secret is required'),
      accessToken: z.string().min(1, 'Supabase Access Token is required'),
    }),
    database: z.object({
      url: z.string().url('Invalid Database URL'),
      directUrl: z.string().url('Invalid Direct URL'),
      projectRegion: z.string().min(1, 'Project Region is required'),
    }),
  }),

  security: z.object({
    auth: z.object({
      cookie: z.literal(AuthCookie.auth),
      secret: z.string().min(12, 'Secret must be at least 12 characters'),
      serverUrlKey: z.literal(AuthCookie.serverUrl),
      authSecret: z.string().min(12, 'Auth Secret must be at least 12 characters'),
      tokenDuration: z.literal(AuthCookie.tokenDuration),
    }),
    password: z.object({
      pepper: z.string().min(12, 'Password Pepper must be at least 12 characters'),
    }),
  }),

  integrations: z.object({
    google: z.object({
      maps: z.object({
        apiKey: z.string().min(1, 'Google Maps API Key is required'),
        mapId: z.string().min(1, 'Google Maps Map ID is required'),
      }),
      oauth: z.object({
        clientId: z.string().min(1, 'Google Client ID is required'),
        clientSecret: z.string().min(1, 'Google Client Secret is required'),
      }),
    }),
    analytics: z.object({
      googleAnalytics: z.object({
        measurementId: z.string().min(1, 'GA Measurement ID is required'),
        trackingId: z.string().min(1, 'GA Tracking ID is required'),
      }),
      googleTagManager: z.object({
        id: z.string().min(1, 'GTM ID is required'),
      }),
      adSense: z.object({
        id: z.string().min(1, 'AdSense ID is required'),
      }),
    }),
    email: z.object({
      resend: z.object({
        apiKey: z.string().min(1, 'Resend API Key is required'),
        host: z.string().min(1, 'Resend Host is required'),
        port: z.coerce.number().positive('Resend Port must be a positive number'),
        username: z.string().min(1, 'Resend Username is required'),
        from: z.string().email('Invalid From Email'),
        to: z.string().email('Invalid To Email'),
      }),
    }),
    upstash: z.object({
      redis: z.object({
        url: z.string().min(1, 'Upstash Redis URL is required'),
        token: z.string().min(1, 'Upstash Redis Token is required'),
      }),
    }),
  }),

  versionControl: z.object({
    vercel: z.object({
      gitCommitSha: z.string().optional(),
    }),
    github: z.object({
      token: z.string().min(1, 'GitHub Token is required'),
    }),
  }),
});

function loadConfig(): IConfig {
  try {
    const config: IConfig = {
      observability: {
        datadog: {
          applicationId:
            process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID ||
            (() => {
              throw new Error('NEXT_PUBLIC_DATADOG_APPLICATION_ID is missing');
            })(),
          clientToken:
            process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ||
            (() => {
              throw new Error('NEXT_PUBLIC_DATADOG_CLIENT_TOKEN is missing');
            })(),
          site:
            process.env.NEXT_PUBLIC_DATADOG_SITE ||
            (() => {
              throw new Error('NEXT_PUBLIC_DATADOG_SITE is missing');
            })(),
        },
        sentry: {
          dsn:
            process.env.NEXT_PUBLIC_SENTRY_DSN ||
            (() => {
              throw new Error('NEXT_PUBLIC_SENTRY_DSN is missing');
            })(),
          authToken:
            process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN ||
            (() => {
              throw new Error('NEXT_PUBLIC_SENTRY_AUTH_TOKEN is missing');
            })(),
        },
      },
      app: {
        environment:
          (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
        version:
          process.env.NEXT_PUBLIC_APP_VERSION ||
          (() => {
            throw new Error('NEXT_PUBLIC_APP_VERSION is missing');
          })(),
        url:
          process.env.NEXT_PUBLIC_APP_URL ||
          (() => {
            console.error('NEXT_PUBLIC_APP_URL is missing');
            return 'http://localhost:3000';
          })(),
        analyze: process.env.ANALYZE === 'true',
      },
      backend: {
        supabase: {
          url:
            process.env.NEXT_PUBLIC_SUPABASE_URL ||
            (() => {
              throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing');
            })(),
          anonKey:
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
            (() => {
              throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
            })(),
          serviceRoleKey:
            process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
            (() => {
              throw new Error('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY is missing');
            })(),
          jwtSecret:
            process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET ||
            (() => {
              throw new Error('NEXT_PUBLIC_SUPABASE_JWT_SECRET is missing');
            })(),
          accessToken:
            process.env.SUPABASE_ACCESS_TOKEN ||
            (() => {
              throw new Error('SUPABASE_ACCESS_TOKEN is missing');
            })(),
        },
        database: {
          url:
            process.env.DATABASE_URL ||
            (() => {
              throw new Error('DATABASE_URL is missing');
            })(),
          directUrl:
            process.env.DIRECT_URL ||
            (() => {
              throw new Error('DIRECT_URL is missing');
            })(),
          projectRegion:
            process.env.NEXT_PUBLIC_PROJECT_REGION ||
            (() => {
              throw new Error('NEXT_PUBLIC_PROJECT_REGION is missing');
            })(),
        },
      },
      security: {
        auth: {
          cookie:
            process.env.AUTH_COOKIE ||
            (() => {
              console.error('AUTH_COOKIE is missing');
              return AuthCookie.auth;
            })(),
          secret:
            process.env.SECRET ||
            (() => {
              throw new Error('SECRET is missing');
            })(),
          serverUrlKey:
            process.env.SERVER_URL_KEY ||
            (() => {
              console.error('SERVER_URL_KEY is missing');
              return AuthCookie.serverUrl;
            })(),
          authSecret:
            process.env.AUTH_SECRET ||
            (() => {
              throw new Error('AUTH_SECRET is missing');
            })(),
          tokenDuration:
            process.env.SEVEN_DAYS ||
            (() => {
              console.error('SEVEN_DAYS is missing');
              return AuthCookie.tokenDuration;
            })(),
        },
        password: {
          pepper:
            process.env.PASSWORD_PEPPER ||
            (() => {
              throw new Error('PASSWORD_PEPPER is missing');
            })(),
        },
      },
      integrations: {
        google: {
          maps: {
            apiKey:
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
              (() => {
                throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing');
              })(),
            mapId:
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ||
              (() => {
                throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID is missing');
              })(),
          },
          oauth: {
            clientId:
              process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
              (() => {
                throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing');
              })(),
            clientSecret:
              process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ||
              (() => {
                throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_SECRET is missing');
              })(),
          },
        },
        analytics: {
          googleAnalytics: {
            measurementId:
              process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
              (() => {
                throw new Error('NEXT_PUBLIC_GA_MEASUREMENT_ID is missing');
              })(),
            trackingId:
              process.env.NEXT_PUBLIC_GA_TRACKING_ID ||
              (() => {
                throw new Error('NEXT_PUBLIC_GA_TRACKING_ID is missing');
              })(),
          },
          googleTagManager: {
            id:
              process.env.NEXT_PUBLIC_GTM_ID ||
              (() => {
                throw new Error('NEXT_PUBLIC_GTM_ID is missing');
              })(),
          },
          adSense: {
            id:
              process.env.NEXT_PUBLIC_ADSENSE_ID ||
              (() => {
                throw new Error('NEXT_PUBLIC_ADSENSE_ID is missing');
              })(),
          },
        },
        email: {
          resend: {
            apiKey:
              process.env.NEXT_PUBLIC_RESEND_API_KEY ||
              (() => {
                throw new Error('NEXT_PUBLIC_RESEND_API_KEY is missing');
              })(),
            host:
              process.env.NEXT_PUBLIC_RESEND_HOST ||
              (() => {
                throw new Error('NEXT_PUBLIC_RESEND_HOST is missing');
              })(),
            port: Number.parseInt(process.env.NEXT_PUBLIC_RESEND_PORT || '0', 10),
            username:
              process.env.NEXT_PUBLIC_RESEND_USERNAME ||
              (() => {
                throw new Error('NEXT_PUBLIC_RESEND_USERNAME is missing');
              })(),
            from:
              process.env.NEXT_PUBLIC_RESEND_EMAIL_FROM ||
              (() => {
                throw new Error('NEXT_PUBLIC_RESEND_EMAIL_FROM is missing');
              })(),
            to:
              process.env.NEXT_PUBLIC_RESEND_EMAIL_TO ||
              (() => {
                throw new Error('NEXT_PUBLIC_RESEND_EMAIL_TO is missing');
              })(),
          },
        },
        upstash: {
          redis: {
            url:
              process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL ||
              (() => {
                throw new Error('NEXT_PUBLIC_UPSTASH_REDIS_REST_URL is missing');
              })(),
            token:
              process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN ||
              (() => {
                throw new Error('NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN is missing');
              })(),
          },
        },
      },
      versionControl: {
        vercel: {
          gitCommitSha:
            process.env.VERCEL_GIT_COMMIT_SHA ||
            (() => {
              console.error('VERCEL_GIT_COMMIT_SHA is missing');
              return undefined;
            })(),
        },
        github: {
          token:
            process.env.GITHUB_TOKEN ||
            (() => {
              console.error('GITHUB_TOKEN is missing');
              return 'ghp_1234567890';
            })(),
        },
      },
    };

    const validated = configSchema.parse(config);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Configuration Validation Errors:', error.errors);
      throw new Error('Invalid configuration. Please check your environment variables.');
    }
    throw error;
  }
}

export const config = loadConfig();

export function getConfig<K extends keyof IConfig, S extends keyof IConfig[K]>(
  category: K,
  subcategory?: S,
): IConfig[K] | IConfig[K][S] {
  if (subcategory) {
    return config[category][subcategory];
  }
  return config[category];
}
