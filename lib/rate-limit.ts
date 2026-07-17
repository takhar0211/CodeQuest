interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

// In-memory store for rate limiting. Suitable for a single-instance Node.js deployment.
// For serverless/edge deployments, a distributed store like Redis/Upstash is recommended.
const store = new Map<string, TokenBucket>();

/**
 * Basic in-memory Token Bucket rate limiter.
 */
export function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { success: boolean; limit: number; remaining: number } {
  const now = Date.now();
  const bucket = store.get(identifier) ?? { tokens: limit, lastRefill: now };
  
  // Refill tokens based on time passed
  const timePassed = now - bucket.lastRefill;
  const refillRate = limit / windowMs;
  const tokensToAdd = Math.floor(timePassed * refillRate);
  
  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(limit, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }
  
  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    store.set(identifier, bucket);
    return { success: true, limit, remaining: Math.floor(bucket.tokens) };
  }
  
  return { success: false, limit, remaining: 0 };
}
