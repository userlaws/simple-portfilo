import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
}

export function BlogCard({
  title,
  description,
  slug,
  category,
}: BlogCardProps) {
  return (
    <a
      href={`/blog/${slug}`}
      aria-label={`Read ${title}`}
      className='block group'
    >
      <Card className='transition-all border border-border/70 bg-card/70 hover:border-accent/50 hover:bg-card hover:shadow-[0_0_30px_rgba(76,195,255,0.08)]'>
        <CardHeader className='space-y-3'>
          <div className='flex items-center justify-between'>
            {category && (
              <span className='text-xs bg-muted/60 px-2.5 py-1 rounded-full text-muted-foreground'>
                {category}
              </span>
            )}
          </div>
          <CardTitle className='text-xl group-hover:text-accent transition-colors wrap-break-word leading-tight min-h-[1.2em] overflow-visible'>
            {title}
          </CardTitle>
          <CardDescription className='wrap-break-word leading-relaxed overflow-visible'>
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
}
