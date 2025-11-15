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
    <a href={`/blog/${slug}`} className='block group'>
      <Card className='transition-all hover:shadow-lg hover:border-accent/50'>
        <CardHeader>
          <div className='flex items-center justify-between mb-2'>
            {category && (
              <span className='text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground'>
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
