# Technical Notes Template

Use this template for creating new technical notes. Each note should follow this structure:

## MDX Template

````mdx
---
title: 'Your Note Title Here'
summary: 'Brief description of what this note covers.'
tags: ['backend', 'performance', 'typescript']
---

## Why

One short paragraph explaining the problem or motivation.

## The idea

Bullet points for the core concept:

- Key point 1
- Key point 2
- Key point 3

## Code

```ts
// Your code snippet here
```
````

## Implementation

Details about how to implement this in practice.

## Testing

How to test this approach.

## References

Links to documentation, examples, or related resources.

````

## Content Guidelines

### Categories
- **Backend & Data**: Database, APIs, performance, data processing
- **Home Lab & Hosting**: Self-hosting, Linux, services, infrastructure
- **Security & Systems**: Security practices, system administration, networking
- **Product & Process**: Development workflow, CI/CD, documentation
- **Integrations & Platform**: Third-party services, authentication, webhooks
- **Learning Journal**: Learning experiences, new technologies, experiments

### Writing Style
- Keep it practical and actionable
- Include code examples where relevant
- Focus on real-world applications
- Be specific about tools and techniques
- Include troubleshooting tips

### Structure
1. **Title**: Clear, descriptive, and searchable
2. **Summary**: One-line description for the card
3. **Why**: Problem statement or motivation
4. **The idea**: Core concepts and approach
5. **Code**: Practical implementation examples
6. **Implementation**: Real-world application details
7. **Testing**: How to verify it works
8. **References**: Additional resources

## Example Note Structure

```mdx
---
title: "Rate limiting 101: token bucket in 25 lines"
summary: "A simple TypeScript implementation of token bucket rate limiting."
tags: ["backend", "performance", "typescript"]
---

## Why
Rate limiting prevents API abuse and ensures fair usage, but many implementations are overly complex or don't handle edge cases well.

## The idea
- Token bucket algorithm: tokens refill at steady rate, requests consume tokens
- Burst capacity vs steady-state rate
- Global vs per-user rate limiting
- Testing with fake timers for deterministic behavior

## Code
```ts
class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRate: number
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  // Implementation details...
}
````

## Implementation

- Use Redis for distributed rate limiting
- Implement at edge (Cloudflare) vs application level
- Consider different rate limits for different endpoints

## Testing

- Use Jest fake timers for deterministic testing
- Test burst capacity and steady-state behavior
- Verify cleanup of expired rate limit data

## References

- [Token Bucket Algorithm](https://en.wikipedia.org/wiki/Token_bucket)
- [Redis Rate Limiting](https://redis.io/docs/manual/rate-limiting/)

```

## File Organization

Create individual note files in the `app/notes/` directory:

```

app/notes/
├── rate-limiting-token-bucket/
│ └── page.tsx
├── idempotent-posts/
│ └── page.tsx
├── schema-migrations/
│ └── page.tsx
└── ...

```

Each note should be a complete, standalone page with:
- Clear title and description
- Code examples
- Implementation details
- Testing guidance
- References
```
