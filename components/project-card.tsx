import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProjectCardProps {
  title: string;
  tags: string[];
  description: string;
  href: string;
}

export function ProjectCard({
  title,
  tags,
  description,
  href,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${title} project`}
      className='block group cursor-pointer'
    >
      <Card className='transition-all duration-300 border border-border/70 bg-card/70 hover:border-accent/50 hover:bg-card hover:shadow-[0_0_40px_rgba(76,195,255,0.08)]'>
        <CardHeader className='space-y-4'>
          <div className='h-1 w-10 rounded-full bg-accent/70'></div>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant='secondary'
                className='font-mono text-xs bg-muted/60 text-foreground group-hover:bg-accent/15 transition-colors'
              >
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className='text-2xl group-hover:text-accent transition-colors duration-300 wrap-break-word leading-tight min-h-[1.2em] overflow-visible group-hover:underline decoration-2 underline-offset-4'>
            {title}
          </CardTitle>
          <CardDescription className='text-base wrap-break-word leading-relaxed overflow-visible group-hover:text-foreground/80 transition-colors duration-300'>
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
}
