import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface NoteCardProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
}

// List of notes that actually have pages
const existingNotes = [
  'rate-limiting-token-bucket',
  // Add more as they are created
];

export function NoteCard({
  title,
  description,
  slug,
  category,
}: NoteCardProps) {
  const hasPage = existingNotes.includes(slug);

  if (hasPage) {
    return (
      <a href={`/notes/${slug}`} className='block group'>
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

  // Non-clickable version for notes without pages
  return (
    <div className='block group'>
      <Card className='transition-all opacity-75 cursor-not-allowed'>
        <CardHeader>
          <div className='flex items-center justify-between mb-2'>
            {category && (
              <span className='text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground'>
                {category}
              </span>
            )}
            <span className='text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full'>
              Coming Soon
            </span>
          </div>
          <CardTitle className='text-xl wrap-break-word leading-tight min-h-[1.2em] overflow-visible text-muted-foreground'>
            {title}
          </CardTitle>
          <CardDescription className='wrap-break-word leading-relaxed overflow-visible'>
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
