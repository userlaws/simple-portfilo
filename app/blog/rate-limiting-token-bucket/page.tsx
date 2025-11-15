import { Navigation } from '@/components/navigation';

export default function RateLimitingPage() {
  return (
    <main className='min-h-screen'>
      <Navigation />
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-4xl'>
        <div className='space-y-6 sm:space-y-8'>
          <div className='text-center sm:text-left py-2'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight wrap-break-word min-h-[1.2em] overflow-visible pb-1'>
              Rate limiting 101: token bucket in 25 lines
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl wrap-break-word leading-relaxed'>
              TS implementation + where to enforce (edge vs app). Token math,
              burst vs steady-state, global vs per-user keys, testing with fake
              timers.
            </p>
          </div>

          <div className='prose prose-slate max-w-none'>
            <h2>Why</h2>
            <p>
              Rate limiting prevents API abuse and ensures fair usage, but many
              implementations are overly complex or don't handle edge cases
              well. A simple token bucket algorithm can solve most rate limiting
              needs.
            </p>

            <h2>The idea</h2>
            <ul>
              <li>
                Token bucket algorithm: tokens refill at steady rate, requests
                consume tokens
              </li>
              <li>Burst capacity vs steady-state rate</li>
              <li>Global vs per-user rate limiting</li>
              <li>Testing with fake timers for deterministic behavior</li>
            </ul>

            <h2>Code</h2>
            <pre className='bg-slate-100 p-4 rounded-lg overflow-x-auto'>
              <code className='text-sm'>{`class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  
  constructor(
    private capacity: number,
    private refillRate: number
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  
  consume(tokens: number = 1): boolean {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }
  
  private refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = (timePassed / 1000) * this.refillRate;
    
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
}`}</code>
            </pre>

            <h2>Implementation</h2>
            <p>
              Use Redis for distributed rate limiting. Consider implementing at
              edge (Cloudflare) vs application level. Different endpoints may
              need different rate limits.
            </p>

            <h2>Testing</h2>
            <p>
              Use Jest fake timers for deterministic testing. Test burst
              capacity and steady-state behavior. Verify cleanup of expired rate
              limit data.
            </p>

            <h2>References</h2>
            <ul>
              <li>
                <a
                  href='https://en.wikipedia.org/wiki/Token_bucket'
                  className='text-primary hover:text-primary/80'
                >
                  Token Bucket Algorithm
                </a>
              </li>
              <li>
                <a
                  href='https://redis.io/docs/manual/rate-limiting/'
                  className='text-primary hover:text-primary/80'
                >
                  Redis Rate Limiting
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
