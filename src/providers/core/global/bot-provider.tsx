'use client';

import { type BotDetectionResult, load } from '@fingerprintjs/botd';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { logger } from '@/utils/logger';

// ✅ FIX: Import missing utility functions
import { railway, success, bind, map, tap } from '@/utils/helpers'; // Update path accordingly

type BotContextType = {
  botDetectionResult: BotDetectionResult | null;
  isLoading: boolean;
  error: Error | null;
};

const BotContext = createContext<BotContextType | null>(null);

export const BotProvider = ({ children }: { children: React.ReactNode }) => {
  const [botDetectionResult, setBotDetectionResult] = useState<BotDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ✅ Logger should now be defined correctly
  const log = logger.getSubLogger({ prefix: ['providers', 'core', 'global', 'bot-provider'] });

  useEffect(() => {
    railway(
      undefined,
      () => success(load({ monitoring: false })),
      bind((botd: ReturnType<typeof load>) => success(botd.then((s) => s.detect()))),
      map((result: BotDetectionResult) => {
        setBotDetectionResult(result);
        return result;
      }),
      tap(() => setIsLoading(false)),
    ).success
      ? log.info('Bot detection completed successfully')
      : ((err) => {
          log.error('Bot detection failed:', err);
          setError(err);
          setIsLoading(false);
        })(error);
  }, []);

  return (
    <BotContext.Provider value={{ botDetectionResult, isLoading, error }}>
      {children}
    </BotContext.Provider>
  );
};

export const useBotDetection = () => {
  const context = useContext(BotContext);
  const log = logger.getSubLogger({
    prefix: ['providers', 'core', 'global', 'bot-provider', 'useBotDetection'],
  });
  if (!context) {
    log.error('useBotDetection must be used within a BotProvider');
    throw new Error('useBotDetection must be used within a BotProvider');
  }
  log.info('useBotDetection', { ...context });
  return { ...context };
};
