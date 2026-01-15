'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { BlogCard } from '@/components/blog-card';
import { useLanguage } from '@/contexts/language-context';
import { Filter, ChevronDown } from 'lucide-react';

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  category: string;
}

const categories = [
  'All',
  'Backend & Data',
  'Infrastructure',
  'Security',
  'Engineering',
  'APIs & Integrations',
  'Tutorials',
];

// Custom Dropdown Component
function CategoryDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
  posts,
  hideEmpty = true,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  posts: BlogPost[];
  hideEmpty?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate post counts for each category
  const getCategoryCount = (category: string) => {
    if (category === 'All') return posts.length;
    return posts.filter((post) => post.category === category).length;
  };

  // Filter categories based on hideEmpty setting
  const visibleCategories = hideEmpty
    ? categories.filter((category) => {
        // Always show "All" and the selected category
        if (category === 'All' || category === selectedCategory) return true;
        return getCategoryCount(category) > 0;
      })
    : categories;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className='relative w-full sm:w-auto' ref={dropdownRef}>
      {/* Dropdown Trigger - Mobile-first: full width on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-3 w-full sm:min-w-[200px] sm:w-auto
          min-h-[44px] touch-manipulation
          bg-card/70 border border-border/70 rounded-lg
          hover:border-accent/40 hover:bg-card hover:shadow-[0_0_20px_rgba(76,195,255,0.08)]
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
          transition-all duration-200 ease-in-out
          ${
            isOpen
              ? 'border-accent bg-card shadow-lg ring-1 ring-accent/20'
              : ''
          }
        `}
        aria-label='Select category'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <Filter className='h-4 w-4 text-muted-foreground flex-shrink-0' />
        <span className='flex-1 text-left text-sm font-medium'>
          {selectedCategory} (
          {getCategoryCount(selectedCategory)})
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu - Mobile-first: full width, better positioning */}
      <div
        className={`
          absolute top-full left-0 right-0 sm:right-auto sm:min-w-[200px] mt-2 z-50
          bg-card/95 backdrop-blur-sm border border-border/70 rounded-lg shadow-xl
          overflow-hidden
          transition-all duration-300 ease-out
          ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100 shadow-2xl ring-1 ring-accent/10'
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }
        `}
        role='listbox'
        aria-label='Category options'
        style={{
          transformOrigin: 'top center',
        }}
      >
        <div className='py-1 max-h-[60vh] overflow-y-auto'>
          {visibleCategories.map((category, index) => {
            const count = getCategoryCount(category);
            const isSelected = category === selectedCategory;
            const isEmpty = count === 0 && category !== 'All';

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                disabled={isEmpty && !isSelected}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-sm
                  min-h-[44px] touch-manipulation
                  transition-all duration-200 ease-out
                  ${
                    isEmpty && !isSelected
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-accent/10 hover:text-foreground active:bg-accent/15'
                  }
                  ${
                    isSelected
                      ? 'bg-accent/15 text-foreground'
                      : 'text-foreground'
                  }
                `}
                role='option'
                aria-selected={isSelected}
                style={{
                  animationDelay: `${index * 30}ms`,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                  opacity: isOpen ? (isEmpty && !isSelected ? 0.5 : 1) : 0,
                  transition: `all 0.2s ease-out ${index * 30}ms`,
                }}
              >
                <span className='font-medium'>{category}</span>
                <span className='text-xs opacity-70'>({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>(posts);
  const [isLoading, setIsLoading] = useState(posts.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blog', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = (await response.json()) as { posts?: BlogPost[] };
        if (isMounted) {
          setVisiblePosts(data.posts ?? []);
          setLoadError(null);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(
            error instanceof Error ? error.message : 'Unable to load posts'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts =
    selectedCategory === 'All'
      ? visiblePosts
      : visiblePosts.filter((post) => post.category === selectedCategory);

  return (
    <main className='min-h-screen'>
      <Navigation />
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-4xl'>
        <div className='space-y-6 sm:space-y-8'>
          <div className='rounded-3xl border border-border/70 bg-card/70 px-6 py-7 sm:px-8 sm:py-8 shadow-[0_0_40px_rgba(76,195,255,0.08)] text-center sm:text-left'>
            <div className='h-1 w-10 rounded-full bg-accent/70 mb-4 mx-auto sm:mx-0'></div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight wrap-break-word min-h-[1.2em] overflow-visible pb-1'>
              {t('blogTitle')}
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl wrap-break-word leading-relaxed'>
              {t('blogSubtitle')}
            </p>
          </div>

          {/* Beautiful Animated Dropdown - Mobile-first */}
          <div className='flex flex-col sm:flex-row justify-center sm:justify-start gap-4'>
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              posts={posts}
              hideEmpty={true}
            />

            {/* Clear Filter Button */}
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className='px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 border border-border/70 rounded-lg hover:border-accent/40 hover:bg-accent/10'
              >
                {t('clearFilter')}
              </button>
            )}
          </div>

          {/* Results Summary */}
          <div className='flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in duration-300'>
            <span>
              {t('showingNotes')} {filteredPosts.length}{' '}
              {filteredPosts.length === 1 ? t('note') : t('notePlural')}
            </span>
            {selectedCategory !== 'All' && (
              <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 animate-in slide-in-from-left-2 duration-300'>
                {selectedCategory}
              </span>
            )}
          </div>

          {/* Blog Posts Grid */}
          <div className='space-y-6 sm:space-y-8'>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

          {/* No results message */}
          {isLoading && filteredPosts.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>{t('loading')}</p>
            </div>
          )}
          {!isLoading && loadError && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>{loadError}</p>
            </div>
          )}
          {!isLoading && !loadError && filteredPosts.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>{t('noNotesFound')}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

