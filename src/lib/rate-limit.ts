type RateLimitHelper = {
  rateLimitingType?: "default";
  identifier: string;
};

export const rateLimiter = (
  _: RateLimitHelper["rateLimitingType"] = "default",
) => {
  return async function rateLimit({
    identifier: _identifier,
  }: RateLimitHelper) {
    return {
      success: true,
      limit: 9999,
      remaining: 9999,
      reset: Date.now() + 1000,
    };
  };
};
