'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { BlogCard } from '@/components/blog-card';
import { Footer } from '@/components/footer';
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

const CategoryDropdown = ({
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getCategoryCount = (category: string) => {
    if (category === 'All') return posts.length;
    return posts.filter((post) => post.category === category).length;
  };

  const visibleCategories = hideEmpty
    ? categories.filter((category) => {
        if (category === 'All' || category === selectedCategory) return true;
        return getCategoryCount(category) > 0;
      })
    : categories;

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-3 w-full sm:min-w-[200px] sm:w-auto bg-card/70 border border-border/70 rounded-xl hover:border-accent/40 hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 ${
          isOpen ? 'border-accent bg-card shadow-lg ring-1 ring-accent/20' : ''
        }`}
        aria-label='Select category'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <Filter className='h-4 w-4 text-muted-foreground shrink-0' />
        <span className='flex-1 text-left text-sm font-medium'>
          {selectedCategory} ({getCategoryCount(selectedCategory)})
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute top-full left-0 right-0 sm:right-auto sm:min-w-[200px] mt-2 z-50 bg-card/95 backdrop-blur-sm border border-border/70 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
        role='listbox'
        aria-label='Category options'
      >
        <div className='py-1 max-h-[60vh] overflow-y-auto'>
          {visibleCategories.map((category) => {
            const count = getCategoryCount(category);
            const isSelected = category === selectedCategory;
            const isEmpty = count === 0 && category !== 'All';

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                disabled={isEmpty && !isSelected}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-200 ${
                  isEmpty && !isSelected
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-accent/10 hover:text-foreground'
                } ${
                  isSelected ? 'bg-accent/15 text-foreground' : 'text-foreground'
                }`}
                role='option'
                aria-selected={isSelected}
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
};

export const BlogPageClient = ({ posts }: { posts: BlogPost[] }) => {
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
        if (!response.ok) throw new Error('Failed to fetch blog posts');
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
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPosts();
    return () => { isMounted = false; };
  }, []);

  const filteredPosts =
    selectedCategory === 'All'
      ? visiblePosts
      : visiblePosts.filter((post) => post.category === selectedCategory);

  return (
    <main className='min-h-screen'>
      <Navigation />
      <div className='max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-16'>
        <div className='space-y-8'>
          <div className='text-center space-y-4'>
            <div className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground'>
              <span className='h-1 w-8 rounded-full bg-accent/70' />
              {t('blog')}
            </div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground'>
              {t('blogTitle')}
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {t('blogSubtitle')}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              posts={posts}
              hideEmpty
            />

            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className='px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 border border-border/70 rounded-xl hover:border-accent/40 hover:bg-accent/10'
              >
                {t('clearFilter')}
              </button>
            )}
          </div>

          <div className='text-center text-sm text-muted-foreground'>
            {t('showingNotes')} {filteredPosts.length}{' '}
            {filteredPosts.length === 1 ? t('note') : t('notePlural')}
            {selectedCategory !== 'All' && (
              <span className='inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent border border-accent/20'>
                {selectedCategory}
              </span>
            )}
          </div>

          <div className='space-y-6'>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

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
      <Footer />
    </main>
  );
};
